# Repomix

Pack your codebase into a single AI-friendly file.

## Setup

```bash
git clone https://github.com/CoderFake/repomix.git
cd repomix
npm install
npm run build
```

## Usage

```bash
# Pack current directory
node bin/repomix.cjs

# Pack specific directory
node bin/repomix.cjs path/to/directory

# Pack remote repo
node bin/repomix.cjs --remote CoderFake/repomix

# Include/exclude
node bin/repomix.cjs --include "src/**/*.ts" --ignore "**/*.test.ts"

# Compress
node bin/repomix.cjs --compress

# Write to stdout
node bin/repomix.cjs --stdout
```

## MCP Server

**stdio** (default):
```bash
node bin/repomix.cjs --mcp
```

**HTTP** (default port 8088):
```bash
node bin/repomix.cjs --mcp --mcp-transport streamable-http
node bin/repomix.cjs --mcp --mcp-transport streamable-http --mcp-port 9000
```

**Agent config (stdio):**
```json
{
  "mcpServers": {
    "repomix": { "command": "node", "args": ["/path/to/repomix/bin/repomix.cjs", "--mcp"] }
  }
}
```

**Agent config (HTTP):**
```json
{
  "mcpServers": {
    "repomix": { "type": "http", "url": "http://localhost:8088/mcp" }
  }
}
```

## Agent Skill

Point your agent to `skill/SKILL.md`. The skill uses Repomix MCP tools to pack a repo and extract its tech stack via targeted grep. Reference files are in `skill/references/`.

## Configuration

Create `repomix.config.json`:

```json
{
  "output": {
    "filePath": "repomix-output.xml",
    "style": "xml",
    "compress": false
  },
  "include": [],
  "ignore": {
    "useGitignore": true,
    "customPatterns": []
  }
}
```

## License

MIT
