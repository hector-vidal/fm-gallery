import { z } from "astro/zod";

export const DIFFICULTIES = ["Newbie", "Junior", "Intermediate", "Advanced", "Guru"] as const;

export const TECHNOLOGIES = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "Sass",
  "React",
  "Vue",
  "Svelte",
  "Astro",
  "Next.js",
  "Angular",
] as const;

const hasNoDuplicates = (values: readonly string[]) => new Set(values).size === values.length;

// The challenge.json format. Strict: an unknown key invalidates the manifest.
export const manifestSchema = z.strictObject({
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  difficulty: z.enum(DIFFICULTIES),
  // Relative to the repository root, without leaving it.
  screenshot: z
    .string()
    .regex(/^(?!\/)(?!.*\.\.).+\.(png|jpg|webp)$/, "Ruta relativa acabada en .png, .jpg o .webp"),
  variants: z
    .array(
      z.strictObject({
        folder: z.string().regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
        technologies: z
          .array(z.enum(TECHNOLOGIES))
          .min(1)
          .refine(hasNoDuplicates, "Tecnologías repetidas"),
      }),
    )
    .min(1)
    .refine((variants) => hasNoDuplicates(variants.map((v) => v.folder)), "Carpetas repetidas"),
});

export type Manifest = z.infer<typeof manifestSchema>;

export interface Repository {
  name: string;
  default_branch: string;
  pushed_at: string;
}

export interface Challenge extends Manifest {
  /** The repository name without its `fm-` prefix. */
  slug: string;
  repository: string;
  pushedAt: string;
  screenshotUrl: string;
  /** Every technology of every variant, without duplicates, in the order of TECHNOLOGIES. */
  technologies: string[];
}

export type ParseResult = { ok: true; challenge: Challenge } | { ok: false; error: string };

export function parseChallenge(repository: Repository, manifest: unknown): ParseResult {
  const result = manifestSchema.safeParse(manifest);
  if (!result.success) return { ok: false, error: z.prettifyError(result.error) };

  const data = result.data;
  const used = new Set(data.variants.flatMap((v) => v.technologies));
  return {
    ok: true,
    challenge: {
      ...data,
      slug: repository.name.replace(/^fm-/, ""),
      repository: repository.name,
      pushedAt: repository.pushed_at,
      screenshotUrl: `https://raw.githubusercontent.com/hector-vidal/${repository.name}/${repository.default_branch}/${encodeURI(data.screenshot)}`,
      technologies: TECHNOLOGIES.filter((t) => used.has(t)),
    },
  };
}

/** Most recently pushed first. */
export function byMostRecent(a: Challenge, b: Challenge): number {
  return b.pushedAt.localeCompare(a.pushedAt);
}

/** Root-relative, so it keeps working under a custom domain on the user site. */
export function variantHref(challenge: Challenge, folder: string): string {
  return `/${challenge.repository}/${folder}/`;
}
