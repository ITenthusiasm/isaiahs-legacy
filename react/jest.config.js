module.exports = {
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/*",
    "<rootDir>/src/App.tsx",
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 90,
      functions: 75,
      lines: 80,
    },
  },
  testEnvironment: "jest-environment-jsdom",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
