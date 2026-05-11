# Tech Taxonomy

Rules for categorizing detected technologies into a structured summary.

---

## Categories

### Languages
Detected from file extensions in the repository file tree.

| Extension | Language |
|---|---|
| `.ts`, `.tsx` | TypeScript |
| `.js`, `.mjs`, `.cjs` | JavaScript |
| `.py` | Python |
| `.rs` | Rust |
| `.go` | Go |
| `.java`, `.kt` | Java / Kotlin |
| `.cs` | C# |
| `.rb` | Ruby |
| `.php` | PHP |

---

### Frameworks

**Frontend**
- React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Angular, Astro

**Backend**
- Express, Fastify, Hono, Koa, NestJS (Node.js)
- FastAPI, Django, Flask, Starlette, Litestar (Python)
- Gin, Echo, Fiber (Go)
- Axum, Actix (Rust)
- Spring Boot (Java)

**Full-stack**
- Next.js, Nuxt, SvelteKit, Remix, Redwood

---

### Databases

**Relational**: PostgreSQL, MySQL, MariaDB, SQLite
**Document**: MongoDB, CouchDB, Firestore
**Key-value**: Redis, DynamoDB, etcd
**Search**: Elasticsearch, OpenSearch, Meilisearch, Typesense
**Cloud-native**: Supabase, Neon, PlanetScale, Turso, Xata

---

### Infrastructure

**Container**: Docker, docker-compose
**Orchestration**: Kubernetes, Helm
**CI/CD**: GitHub Actions, GitLab CI, CircleCI, Drone
**IaC**: Terraform, Pulumi, CDK
**Hosting**: Vercel, Netlify, Fly.io, Render, Railway

**Cloud providers**:
- AWS (S3, Lambda, EC2, RDS, Cognito, SQS…)
- GCP (Cloud Run, BigQuery, GCS, Firestore…)
- Azure

---

### Architecture Patterns

Infer from directory structure and config files:

| Signal | Pattern |
|---|---|
| `packages/`, `apps/`, `libs/` dirs | Monorepo |
| Multiple `Dockerfile` at different paths | Microservices |
| `--mcp` flag, `@modelcontextprotocol` dep | MCP Server |
| `openapi.yaml`, `swagger.json` | REST API with spec |
| `schema.graphql`, `apollo` dep | GraphQL API |
| `worker.ts`, `queue`, `celery` | Background workers |
| `prisma/schema.prisma` | Prisma ORM schema |

---

## Confidence Levels

When building the summary, note confidence:
- **High** — found in dependency file (package.json, requirements.txt)
- **Medium** — found in import statements or config files
- **Low** — only found in README or comments