import type { Config } from "jest"
import baseConfig from "./jest.config"

const config: Config = {
  ...baseConfig,
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.selenium.test.ts"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", {}],
  },
}

export default config
