"use strict";
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
//# sourceMappingURL=jest.config.js.map