import { expect, test } from "vitest";
import { matches } from "../src/lib/filter";

const card = { difficulty: "Junior", technologies: ["HTML", "CSS", "React"] };

test("no filter shows every challenge", () => {
  expect(matches(card, { difficulty: "", technology: "" })).toBe(true);
});

test("filters by difficulty", () => {
  expect(matches(card, { difficulty: "Junior", technology: "" })).toBe(true);
  expect(matches(card, { difficulty: "Newbie", technology: "" })).toBe(false);
});

test("a challenge matches a technology any of its variants uses", () => {
  expect(matches(card, { difficulty: "", technology: "React" })).toBe(true);
  expect(matches(card, { difficulty: "", technology: "Vue" })).toBe(false);
});

test("both filters apply together", () => {
  expect(matches(card, { difficulty: "Junior", technology: "React" })).toBe(true);
  expect(matches(card, { difficulty: "Newbie", technology: "React" })).toBe(false);
});
