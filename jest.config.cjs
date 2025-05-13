/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], 
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
    "^.+\.jsx?$": "babel-jest" 
  }, 
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'html'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/__test__/**",
    "!src/setupTests.ts",
  ],  
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/coverage/",
    "src/__test__/",
    "src/setupTests.ts"    
  ],
  testResultsProcessor: 'jest-junit',
  reporters: ['default', 'jest-junit'],
  testMatch: ["**/__test__/**/*.test.ts", "**/__test__/**/*.test.tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/core/components/$1",
    "\\.(svg|png|jpg|jpeg|css|scss)$": "<rootDir>/src/__test__/__mocks__/fileMock.js",  
     "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
