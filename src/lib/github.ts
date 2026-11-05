import { byMostRecent, parseChallenge, type Challenge, type Repository } from "./challenges";

const OWNER = "hector-vidal";

interface ListedRepository extends Repository {
  is_template: boolean;
  archived: boolean;
  fork: boolean;
}

type Fetch = typeof fetch;

/**
 * Reads every challenge.json of the owner's fm-* repositories through the GitHub API.
 * A challenge without a valid manifest or screenshot is left out with a warning, so one
 * broken challenge never stops the gallery from publishing. Failing to list the
 * repositories does stop the build: the last published gallery stays online.
 */
export async function loadChallenges(
  token: string | undefined,
  fetchFn: Fetch = fetch,
  warn: (message: string) => void = console.warn,
): Promise<Challenge[]> {
  const headers: Record<string, string> = { "X-GitHub-Api-Version": "2022-11-28" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const repositories: ListedRepository[] = [];
  for (let page = 1; ; page++) {
    const response = await fetchFn(
      `https://api.github.com/users/${OWNER}/repos?type=owner&per_page=100&page=${String(page)}`,
      { headers: { ...headers, Accept: "application/vnd.github+json" } },
    );
    if (!response.ok) {
      throw new Error(`No se pudo listar los repositorios de ${OWNER}: HTTP ${String(response.status)}`);
    }
    const batch = (await response.json()) as ListedRepository[];
    repositories.push(...batch);
    if (batch.length < 100) break;
  }

  const candidates = repositories.filter(
    (r) => r.name.startsWith("fm-") && r.name !== "fm-gallery" && !r.is_template && !r.archived && !r.fork,
  );

  const results = await Promise.all(
    // Each challenge resolves to itself or to the reason it is left out.
    candidates.map(async (repository): Promise<Challenge | string> => {
      // The contents API, not raw.githubusercontent.com: raw is cached for minutes and
      // the rebuild that follows a challenge's publication would read the old manifest.
      const response = await fetchFn(
        `https://api.github.com/repos/${OWNER}/${repository.name}/contents/challenge.json`,
        { headers: { ...headers, Accept: "application/vnd.github.raw+json" } },
      );
      if (!response.ok) return `challenge.json no disponible (HTTP ${String(response.status)})`;

      let manifest: unknown;
      try {
        manifest = JSON.parse(await response.text());
      } catch {
        return "challenge.json no es JSON válido";
      }

      const parsed = parseChallenge(repository, manifest);
      if (!parsed.ok) return `challenge.json no válido\n${parsed.error}`;

      // A missing screenshot would break the image optimisation of the whole build.
      // ponytail: raw.githubusercontent.com caches for minutes, so a replaced screenshot
      // can show up one rebuild late; pin it to the commit SHA if that ever matters.
      const image = await fetchFn(parsed.challenge.screenshotUrl, { method: "HEAD" });
      if (!image.ok) return `no se encuentra la captura ${parsed.challenge.screenshot}`;

      return parsed.challenge;
    }),
  );

  const challenges: Challenge[] = [];
  results.forEach((result, i) => {
    if (typeof result === "string") warn(`Reto omitido, ${candidates[i]?.name ?? ""}: ${result}`);
    else challenges.push(result);
  });
  return challenges.sort(byMostRecent);
}
