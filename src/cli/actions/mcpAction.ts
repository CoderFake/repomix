import { runMcpHttpServer, runMcpServer } from '../../mcp/mcpServer.js';
import { logger } from '../../shared/logger.js';
import type { CliOptions } from '../types.js';

export const runMcpAction = async (options: CliOptions = {}): Promise<void> => {
  const transport = options.mcpTransport ?? 'stdio';

  if (transport === 'streamable-http') {
    logger.trace('Starting Repomix MCP server with Streamable HTTP transport...');
    await runMcpHttpServer({
      host: options.mcpHost,
      port: options.mcpPort,
    });
  } else {
    logger.trace('Starting Repomix MCP server with stdio transport...');
    await runMcpServer();
  }
};
