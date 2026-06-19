# Playwright TypeScript Automation Framework for USIC Claims Management Application

This is a production-grade, highly scalable Playwright + TypeScript test automation framework developed for the Majesco Claims Management Application.

## Architecture & Design Patterns

1. **Page Object Model (POM)**:
   All page interactions are modeled as TypeScript classes. Page classes extend a common `BasePage` which exposes standard operations like `click`, `fill`, and `getText`.

2. **Decoupled Locator Repository**:
   No selectors are hardcoded inside Page Objects. All locators reside in JSON configuration files (`/locators/`) grouped by page name. The `LocatorManager` parses and returns selectors dynamically at runtime.

3. **Dynamic Multi-Environment & Credentials Mapping**:
   Environment execution is controlled by the `ENV` variable. Base URLs and credentials for roles (`Admin`, `Supervisor`, `Manager`, `Adjuster`, `Claims Examiner`, `Read Only User`) are loaded dynamically, allowing credential overrides via OS environment variables.

4. **Custom Fixtures & Automated Hooks**:
   Standard Playwright test runners are extended in `fixtures.ts` to automatically inject preconfigured Page Object instances (`loginPage`, `claimsPage`, etc.) and log execution start/finish metadata.

5. **CI/CD Integration**:
   Includes out-of-the-box configurations for GitHub Actions and Jenkins pipelines supporting manual executions with custom parameters.

---

## Directory Structure

```
USIC_Claims_Playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions Workflow
├── Jenkinsfile                    # Jenkins CI Pipeline
├── config/
│   ├── environments.config.ts     # Environment URL mapping
│   └── credentials.config.ts      # Credentials mapping
├── locators/
│   ├── login.json                 # Login page selectors
│   ├── dashboard.json             # Dashboard page selectors
│   └── claims.json                # Claims page selectors
├── src/
│   ├── pages/
│   │   ├── BasePage.ts            # Common POM base interactions
│   │   ├── LoginPage.ts           # Login POM actions
│   │   ├── DashboardPage.ts       # Dashboard POM actions
│   │   └── ClaimsPage.ts          # Claims Page POM actions
│   ├── utils/
│   │   ├── EnvironmentManager.ts  # Target environment resolver
│   │   ├── CredentialManager.ts   # Role-based credentials resolver
│   │   ├── LocatorManager.ts      # Dynamic JSON locators resolver
│   │   ├── Logger.ts              # Output log files writer
│   │   ├── ScreenshotUtility.ts   # Error screenshots capture
│   │   └── ApiUtility.ts          # Playwright HTTP request wrapper
│   └── tests/
│       ├── fixtures.ts            # Custom E2E Playwright fixtures
│       ├── login.spec.ts          # Authentication test suite
│       ├── dashboard.spec.ts      # Dashboard navigation test suite
│       └── claims.spec.ts         # Claims validation test suite
├── playwright.config.ts           # Playwright Framework Config
├── package.json                   # Dependencies & npm script runner
├── tsconfig.json                  # TypeScript Compiler Options
└── RUN_INSTRUCTIONS.txt           # CLI Commands execution list
```

---

## Prerequisites

- **Node.js**: `v18` or `v20` (Recommended)
- **Java JRE**: Required locally if you wish to generate/view Allure reports via `allure-commandline`.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install browser engines**:
   ```bash
   npx playwright install --with-deps
   ```

3. **Run tests**:
   Please read [RUN_INSTRUCTIONS.txt](file:///c:/Users/Aerva910894/OneDrive - Majesco/Desktop/Sudheer/Playwright/USIC_Claims_Playwright/RUN_INSTRUCTIONS.txt) for specific commands.
