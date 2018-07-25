module.exports = {
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['src/lib/*.{js,vue}', '!**/node_modules/**', '!src/lib/index.js'],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  coverageDirectory: './test/coverage',
  snapshotSerializers: [
    // 配置快照测试
    '<rootDir>/node_modules/jest-serializer-vue',
  ],
};
