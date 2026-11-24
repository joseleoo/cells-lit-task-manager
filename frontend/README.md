# Task Manager Frontend

A Web Components frontend for the Task Manager API, built with LitElement and modern browser standards.

## Technology stack

- LitElement
- Web Components
- JavaScript ES6+
- HTML5
- CSS3
- Vitest or Web Test Runner for unit tests
- Playwright for E2E tests

## Planned commands

Application code will be added in the second roadmap phase. Once the package manifest exists, use:

```bash
npm install
npm run dev
npm test
npx playwright test
```

## Planned structure

```text
frontend/
├── src/
│   ├── components/
│   ├── services/
│   └── styles/
├── test/
├── e2e/
├── index.html
└── README.md
```

The frontend will consume the REST endpoints documented in the [backend README](../backend/README.md).
