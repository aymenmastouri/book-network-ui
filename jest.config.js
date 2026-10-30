/** Unit tests run in Node with jsdom — no browser to start. */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  coverageDirectory: 'coverage/booknetwork-ui',
  coverageReporters: ['lcov', 'text-summary'],
};
