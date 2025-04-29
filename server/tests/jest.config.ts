export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.ts'],
    globalSetup: './tests/global-setup.ts',
    globalTeardown: './tests/global-teardown.ts',
    testMatch: ['**/tests/**/*.test.ts'],
  };
  