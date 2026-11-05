import { describe, expect, test } from "vitest";
import { byMostRecent, parseChallenge, variantHref, type Challenge } from "../src/lib/challenges";
import manifest from "./fixtures/challenge.json";

const repository = {
  name: "fm-social-proof-section",
  default_branch: "main",
  pushed_at: "2026-11-01T10:00:00Z",
};

function parse(overrides: Record<string, unknown> = {}) {
  return parseChallenge(repository, { ...manifest, ...overrides });
}

function valid(overrides: Record<string, unknown> = {}): Challenge {
  const result = parse(overrides);
  if (!result.ok) throw new Error(result.error);
  return result.challenge;
}

describe("parseChallenge", () => {
  test("a valid manifest becomes a challenge", () => {
    const challenge = valid();
    expect(challenge.slug).toBe("social-proof-section");
    expect(challenge.difficulty).toBe("Newbie");
    expect(challenge.screenshotUrl).toBe(
      "https://raw.githubusercontent.com/hector-vidal/fm-social-proof-section/main/screenshot.png",
    );
  });

  test("technologies merge every variant, without duplicates, in catalogue order", () => {
    expect(valid().technologies).toEqual(["HTML", "CSS", "TypeScript", "React"]);
  });

  test.each([
    ["an unknown key", { label: "x" }],
    ["an empty name", { name: "  " }],
    ["an unknown difficulty", { difficulty: "Easy" }],
    ["a screenshot outside the repository", { screenshot: "../x.png" }],
    ["a screenshot that is not an image", { screenshot: "screenshot.gif" }],
    ["no variants", { variants: [] }],
    ["a folder with uppercase", { variants: [{ folder: "React", technologies: ["React"] }] }],
    ["an unknown technology", { variants: [{ folder: "vanilla", technologies: ["HTMX"] }] }],
    ["a repeated technology", { variants: [{ folder: "vanilla", technologies: ["CSS", "CSS"] }] }],
    [
      "a repeated folder",
      {
        variants: [
          { folder: "vanilla", technologies: ["HTML"] },
          { folder: "vanilla", technologies: ["CSS"] },
        ],
      },
    ],
  ])("rejects %s", (_, overrides) => {
    expect(parse(overrides).ok).toBe(false);
  });
});

test("the most recently pushed challenge comes first", () => {
  const older = valid();
  const newer = { ...valid(), pushedAt: "2026-11-03T10:00:00Z" };
  expect([older, newer].sort(byMostRecent)).toEqual([newer, older]);
});

test("a variant opens at /fm-<challenge>/<variant>/", () => {
  expect(variantHref(valid(), "react")).toBe("/fm-social-proof-section/react/");
});
