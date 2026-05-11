import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getVersion } from '../core/file/packageJsonParse.js';
import { logger } from '../shared/logger.js';
import { registerPackRemoteRepositoryPrompt } from './prompts/packRemoteRepositoryPrompts.js';
import { registerAttachPackedOutputTool } from './tools/attachPackedOutputTool.js';
import { registerFileSystemReadDirectoryTool } from './tools/fileSystemReadDirectoryTool.js';
import { registerFileSystemReadFileTool } from './tools/fileSystemReadFileTool.js';
import { registerGenerateSkillTool } from './tools/generateSkillTool.js';
import { registerGrepRepomixOutputTool } from './tools/grepRepomixOutputTool.js';
import { registerPackCodebaseTool } from './tools/packCodebaseTool.js';
import { registerPackRemoteRepositoryTool } from './tools/packRemoteRepositoryTool.js';
import { registerReadRepomixOutputTool } from './tools/readRepomixOutputTool.js';

/**
 * Instructions for the Repomix MCP Server that describe its capabilities and usage
 */
const MCP_SERVER_INSTRUCTIONS =
  'Repomix MCP Server provides AI-optimized codebase analysis tools. ' +
  'Use pack_codebase or pack_remote_repository to consolidate code into a single XML file, ' +
  'use generate_skill to create Claude Agent Skills from codebases, ' +
  'use attach_packed_output to work with existing packed outputs, ' +
  'then read_repomix_output and grep_repomix_output to analyze it. ' +
  'Perfect for code reviews, documentation generation, bug investigation, GitHub repository analysis, and understanding large codebases. ' +
  'Includes security scanning and supports compression for token efficiency.';

export const createMcpServer = async () => {
  const mcpServer = new McpServer(
    {
      name: 'repomix-mcp-server',
      version: await getVersion(),
    },
    {
      instructions: MCP_SERVER_INSTRUCTIONS,
    },
  );

  // Register the prompts
  registerPackRemoteRepositoryPrompt(mcpServer);

  // Register the tools
  registerPackCodebaseTool(mcpServer);
  registerPackRemoteRepositoryTool(mcpServer);
  registerGenerateSkillTool(mcpServer);
  registerAttachPackedOutputTool(mcpServer);
  registerReadRepomixOutputTool(mcpServer);
  registerGrepRepomixOutputTool(mcpServer);
  registerFileSystemReadFileTool(mcpServer);
  registerFileSystemReadDirectoryTool(mcpServer);

  return mcpServer;
};

type Dependencies = {
  processExit?: (code?: number) => never;
};

const defaultDependencies: Dependencies = {
  processExit: process.exit,
};

export const runMcpServer = async (deps: Dependencies = defaultDependencies) => {
  const server = await createMcpServer();
  const transport = new StdioServerTransport();
  const processExit = deps.processExit ?? process.exit;

  const handleExit = async () => {
    try {
      await server.close();
      logger.trace('Repomix MCP Server shutdown complete');
      processExit(0);
    } catch (error) {
      logger.error('Error during MCP server shutdown:', error);
      processExit(1);
    }
  };

  process.on('SIGINT', handleExit);
  process.on('SIGTERM', handleExit);

  try {
    await server.connect(transport);
    logger.trace('Repomix MCP Server running on stdio');
  } catch (error) {
    logger.error('Failed to start MCP server:', error);
    processExit(1);
  }
};

export interface McpHttpOptions {
  host?: string;
  port?: number;
}

const DEFAULT_MCP_HTTP_HOST = '0.0.0.0';
const DEFAULT_MCP_HTTP_PORT = 8088;

/**
 * Run the MCP server with Streamable HTTP transport.
 * Creates an Express app that handles MCP requests via HTTP streaming.
 */
export const runMcpHttpServer = async (
  options: McpHttpOptions = {},
  deps: Dependencies = defaultDependencies,
) => {
  const host = options.host ?? DEFAULT_MCP_HTTP_HOST;
  const port = options.port ?? DEFAULT_MCP_HTTP_PORT;
  const processExit = deps.processExit ?? process.exit;

  const app = createMcpExpressApp({ host });

  // POST /mcp - Main MCP endpoint (stateless mode: new server per request)
  app.post('/mcp', async (req, res) => {
    const server = await createMcpServer();
    try {
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined, // Stateless mode
      });
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
      res.on('close', () => {
        logger.trace('Streamable HTTP request closed');
        transport.close();
        server.close();
      });
    } catch (error) {
      logger.error('Error handling MCP request:', error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error',
          },
          id: null,
        });
      }
    }
  });

  // GET /mcp - Not allowed in stateless mode
  app.get('/mcp', async (_req, res) => {
    res.writeHead(405).end(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Method not allowed.',
        },
        id: null,
      }),
    );
  });

  // DELETE /mcp - Not allowed in stateless mode
  app.delete('/mcp', async (_req, res) => {
    res.writeHead(405).end(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Method not allowed.',
        },
        id: null,
      }),
    );
  });

  // Keep the process alive by wrapping listen in a Promise
  await new Promise<void>((_resolve, reject) => {
    const httpServer = app.listen(port, host, () => {
      logger.log(`Repomix MCP Streamable HTTP Server listening on http://${host}:${port}/mcp`);
    });

    httpServer.on('error', (error: Error) => {
      logger.error('Failed to start MCP HTTP server:', error);
      reject(error);
    });

    const handleExit = async () => {
      logger.trace('Repomix MCP HTTP Server shutting down...');
      httpServer.close(() => {
        processExit(0);
      });
    };

    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);
  });
};
