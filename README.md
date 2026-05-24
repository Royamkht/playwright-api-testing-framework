# playwright-api-testing-framework
## What's tested

- **Authentication** — token generation and header injection across tests
- **Articles** — full CRUD lifecycle: create, read, update, and delete
- **Tags** — tag listing and response validation
- **Pagination** — limit/offset parameter handling on article endpoints

## Technical highlights

- Custom `api` fixture with a fluent request builder (`.path().params().headers().body()`)
- Centralized auth token creation via `createToken` helper
- `beforeAll` hook for shared token setup across tests
- Environment-based config via `api-test.config.ts` (supports dev/qa environments)
- Tests run on push/PR via GitHub Actions CI

API test suite for the [Conduit API](https://conduit-api.bondaracademy.com) using [Playwright Test](https://playwright.dev/docs/test-api-testing).

## Author

**Roya Mokhtari** — [GitHub @Royamkht](https://github.com/Royamkht)

- Repository: [github.com/Royamkht/test-API](https://github.com/Royamkht/test-API)

## Setup

```bash
npm install
npx playwright install
```

## Run tests

```bash
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

## Project structure

| Path | Description |
|------|-------------|
| `tests/` | Playwright test specs |
| `utils/` | Request handler, fixtures, logging |
| `helpers/` | Shared helpers (e.g. auth token) |
| `api-test.config.ts` | API base URL and credentials per environment |

Set `Test_ENV=qa` to use the QA config (see `api-test.config.ts`).

## CI

Tests run on push/PR via [GitHub Actions](.github/workflows/playwright.yml).
