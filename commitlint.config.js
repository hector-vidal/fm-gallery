/** Conventional Commits, enforced by the commit-msg hook. */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Justified divergence: commit messages here are written in Spanish,
    // as decided for the whole fm-* system. The commit types stay in English.
    "subject-case": [2, "never", ["upper-case", "pascal-case", "start-case"]],
    "body-max-line-length": [1, "always", 100],
  },
};
