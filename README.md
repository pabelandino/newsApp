# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Testing

This project includes unit tests to ensure reliability and code quality.

### Running Tests Locally

#### 1. Run all tests (once)
```bash
npm test
```
or
```bash
npm test -- --watchAll=false
```
- Runs all tests once and exits
- Useful for quick verification that everything works

#### 2. Run tests in watch mode (recommended for development)
```bash
npm run test:watch
```
- Runs tests and watches for file changes
- Automatically re-runs tests when you save files
- Perfect for active development

#### 3. Run tests with coverage report
```bash
npm run test:coverage
```
- Runs all tests and generates a coverage report
- Shows which lines of code are covered by tests
- Generates an HTML report in the `coverage/` folder

### Usage Examples

#### Run a specific test file
```bash
npm test -- dateUtils.test.ts
```

#### Run tests matching a pattern
```bash
npm test -- articlesStore
```

#### Run in watch mode with a specific test name pattern
```bash
npm run test:watch -- --testNamePattern="should add articles"
```

#### View coverage report in browser
```bash
npm run test:coverage
# Then open: coverage/lcov-report/index.html
```

### Test Coverage

The project includes 5 test suites covering:
- **Date utilities** (`formatRelativeDate`): Tests for date formatting logic
- **Article recency detection** (`useIsRecentArticle`): Tests for determining if articles are recent
- **Articles store**: Tests for article management, deletion, and restoration
- **Favorites store**: Tests for favorite article management
- **ArticleDetails component**: Tests for component rendering and display

### Quick Verification

To verify everything works:
```bash
npm test
```

Expected output:
```
PASS __tests__/use-is-recent-article.test.ts
PASS __tests__/dateUtils.test.ts
PASS __tests__/articlesStore.test.ts
PASS __tests__/favoritesStore.test.ts
PASS __tests__/ArticleDetails.test.tsx

Test Suites: 5 passed, 5 total
Tests:       27 passed, 27 total
```

### CI/CD Integration

Tests are automatically run on GitHub Actions when:
- Code is pushed to `main` branch
- Pull requests are created targeting `main` branch
- Manual workflow dispatch

The CI pipeline includes:
- Automatic test execution
- Coverage report generation
- Artifact upload for coverage reports

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
