// Kept apart from challenges.ts so the browser bundle does not pull in zod.

export interface Filter {
  /** Empty means any difficulty. */
  difficulty: string;
  /** Empty means any technology. */
  technology: string;
}

/** A challenge matches a technology when any of its variants uses it. */
export function matches(
  card: { difficulty: string; technologies: readonly string[] },
  filter: Filter,
): boolean {
  return (
    (filter.difficulty === "" || card.difficulty === filter.difficulty) &&
    (filter.technology === "" || card.technologies.includes(filter.technology))
  );
}
