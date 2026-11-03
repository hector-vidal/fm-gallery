import { expect, test } from "vitest";

// Smoke test: without any test file, `vitest run` exits with code 1 and CI goes red.
test("the test runner works", () => {
  expect(1 + 1).toBe(2);
});
