import { expect, test, vi } from "vitest";
import { loadChallenges } from "../src/lib/github";
import manifest from "./fixtures/challenge.json";

function repo(name: string, extra: Record<string, unknown> = {}) {
  return {
    name,
    default_branch: "main",
    pushed_at: "2026-11-01T10:00:00Z",
    is_template: false,
    archived: false,
    fork: false,
    ...extra,
  };
}

const repositories = [
  repo("fm-good"),
  repo("fm-invalid"),
  repo("fm-missing"),
  repo("fm-no-screenshot"),
  repo("fm-gallery"),
  repo("fm-template", { is_template: true }),
  repo("Frontend-Mentor-Challenge"),
];

// Stands in for the GitHub API: the tests never reach the network.
const fetchStub = vi.fn((url: string) => {
  const json = (body: unknown) => Promise.resolve(new Response(JSON.stringify(body)));
  const notFound = () => Promise.resolve(new Response(null, { status: 404 }));

  if (url.includes("/users/hector-vidal/repos")) return json(repositories);
  if (url.includes("/fm-good/contents/")) return json(manifest);
  if (url.includes("/fm-no-screenshot/contents/")) return json(manifest);
  if (url.includes("/fm-invalid/contents/")) return json({ ...manifest, difficulty: "Easy" });
  if (url.includes("raw.githubusercontent.com/hector-vidal/fm-good/")) {
    return Promise.resolve(new Response(null));
  }
  return notFound();
});

test("loads valid challenges and leaves out the broken ones with a warning", async () => {
  const warn = vi.fn();
  const challenges = await loadChallenges(undefined, fetchStub as unknown as typeof fetch, warn);

  expect(challenges.map((c) => c.repository)).toEqual(["fm-good"]);
  expect(warn).toHaveBeenCalledTimes(3);
  const warnings = warn.mock.calls.flat().join("\n");
  for (const name of ["fm-invalid", "fm-missing", "fm-no-screenshot"]) expect(warnings).toContain(name);
  // The gallery, the template and repositories without the prefix are never read.
  const read = fetchStub.mock.calls.map(([url]) => url).join("\n");
  expect(read).not.toMatch(/fm-gallery|fm-template|Frontend-Mentor-Challenge/);
});

test("a failed repository listing stops the build", async () => {
  const failing = () => Promise.resolve(new Response(null, { status: 403 }));
  await expect(loadChallenges(undefined, failing as unknown as typeof fetch)).rejects.toThrow(/HTTP 403/);
});
