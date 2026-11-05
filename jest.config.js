/** Unit tests run in Node with jsdom — no browser to start. */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  // Transloco and its utils ship ES modules as plain .js files; Jest must
  // transform them next to the preset's own exceptions (.mjs files and
  // Angular's locale data), or any component that uses a translation cannot
  // be tested.
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|@angular/common/locales/.*\\.js$|@jsverse/)'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  coverageDirectory: 'coverage/booknetwork-ui',
  coverageReporters: ['lcov', 'text-summary'],
};
