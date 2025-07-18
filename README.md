# ORANGE HRM TEST AUTOMATION

This is a web automation solution for demo purpose

## Project Structure
```
.
├── README.md                            # Readme
├── fixtures                             # Playwright fixtures
│   └── fixtures.ts
├── package-lock.json
├── package.json
├── pages                                # Page Object Model for reusable selectors and actions
│   ├── admin                            # Pages only accessible to admin role
│   │   └── view-system-users.page.ts
│   ├── base.page.ts
│   └── login.page.ts
├── playwright.config.ts                 # Playwright config file
├── settings                             # Project setting files
│   └── settings.ts
├── setup                                # Setup tests
│   └── global-setup.spec.ts             # Global setups
├── tests                                # Organized test scripts
│   ├── admin
│   │   └── system-users
│   │       └── search.spec.ts
│   └── login.spec.ts
└── tsconfig.json                        # Typescript config file
```

## Getting Started

### Prerequisites
- Latest [nodejs](https://nodejs.org/en/download)

### Installation
```bash
git clone https://github.com/voducchung/orange-hrm-auto.git
cd orange-hrm-auto
npm install
```

### Environment Variables

Need to set values for these environment variables
```bash
BASE_URL=https://opensource-demo.orangehrmlive.com/web/index.php
ADMIN_USERNAME=Admin # publicly share on orange hrm website
ADMIN_PASSWORD=admin123 # publicly share on orange hrm website
```

## Running Tests

### Run all tests on local
```bash
npm run test:local
```

### Run only regression tests
```bash
npm run test:regression
```

### Show html report
```bash
npm run report:html
```

## CI/CD
To secure environment variables, it uses [dotenvx](https://dotenvx.com/). Follow this [guide](https://dotenvx.com/docs/cis/github-actions#set-decryption-key) to setup dotenvx to work on GitHubActions.

The following npm script is used to run tests on CI/CD
```bash
npm run test:ci
```

### Notes
There is already a demo CI/CD flow for it which can be found [here](https://github.com/voducchung/orange-hrm-auto/actions/workflows/playwright.yml)
