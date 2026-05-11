# Grep Patterns by Ecosystem

Use with `grep_repomix_output`. All patterns use JavaScript RegExp syntax.
Default `contextLines: 2` unless noted.

---

## Node.js / TypeScript

| Pattern | Detects |
|---|---|
| `"dependencies\|devDependencies"` | package.json deps block |
| `"\"next\"\|\"react\"\|\"vue\"\|\"svelte\""` | Frontend framework |
| `"\"express\"\|\"fastify\"\|\"hono\"\|\"koa\""` | Backend framework |
| `"\"prisma\"\|\"typeorm\"\|\"drizzle\"\|\"sequelize\""` | ORM / database client |
| `"\"@modelcontextprotocol\"\|\"mcp\""` | MCP integration |
| `"\"jest\"\|\"vitest\"\|\"mocha\"\|\"playwright\""` | Test framework |
| `"\"typescript\"\|\"ts-node\"\|\"tsx\""` | TypeScript tooling |
| `"\"trpc\"\|\"graphql\"\|\"apollo\""` | API layer |

---

## Python

| Pattern | Detects |
|---|---|
| `"^from \|^import "` | Top-level imports (contextLines: 0) |
| `"fastapi\|flask\|django\|starlette\|litestar"` | Web framework |
| `"sqlalchemy\|tortoise\|peewee\|django.db"` | ORM |
| `"celery\|rq\|dramatiq\|arq"` | Task queue |
| `"pydantic\|marshmallow"` | Validation |
| `"pytest\|unittest"` | Test framework |
| `"torch\|tensorflow\|jax\|sklearn\|transformers"` | ML / AI |
| `"langchain\|openai\|anthropic\|llama_index"` | LLM integration |
| `"uvicorn\|gunicorn\|hypercorn"` | ASGI / WSGI server |

---

## Infrastructure / DevOps

| Pattern | Detects |
|---|---|
| `"^FROM "` | Docker base image (contextLines: 1) |
| `"image:\|services:\|volumes:"` | docker-compose structure |
| `"on:\\s+push\|on:\\s+pull_request"` | GitHub Actions trigger |
| `"runs-on:"` | CI runner |
| `"provider\\s*=\|resource\\s*\""` | Terraform |
| `"apiVersion:\|kind:"` | Kubernetes manifest |

---

## Database Signals

| Pattern | Detects |
|---|---|
| `"postgres\|postgresql\|\\bpg\\b"` | PostgreSQL |
| `"mysql\|mariadb"` | MySQL |
| `"mongodb\|mongoose"` | MongoDB |
| `"redis\|ioredis\|aioredis"` | Redis |
| `"sqlite\|better-sqlite"` | SQLite |
| `"elasticsearch\|opensearch"` | Search engine |
| `"supabase\|neon\|planetscale\|turso"` | Cloud DB |

---

## Cloud / SaaS

| Pattern | Detects |
|---|---|
| `"vercel\|netlify\|fly\\.io\|render\\.com"` | PaaS deployment |
| `"s3\|dynamodb\|lambda\|cognito\|ec2"` | AWS services |
| `"gcs\|bigquery\|firestore\|cloud run"` | GCP services |
| `"\\bazure\\b"` | Azure |
| `"cloudflare\\b"` | Cloudflare |
| `"stripe\|paddle\|lemonsqueezy"` | Payments |
| `"sentry\|datadog\|grafana\|prometheus"` | Observability |