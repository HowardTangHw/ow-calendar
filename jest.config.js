module.exports = {
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  moduleNameMapper: {
    // '^packages/(.*)$': '<rootDir>/packages/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['src/lib/*.vue', '!**/node_modules/**'],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  coverageDirectory: './test/coverage',
};
