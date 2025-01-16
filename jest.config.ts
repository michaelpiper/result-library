/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFiles: ["./jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  coverageReporters: ["html"],
};

export default config;
