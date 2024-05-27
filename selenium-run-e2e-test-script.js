require("ts-node").register({
  project: "tsconfig.selenium.json",
})
require("./__tests__/e2e.selenium.test.ts")
