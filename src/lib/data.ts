import { GITHUB_TOKEN } from "astro:env/server";
import type { Challenge } from "./challenges";
import { loadChallenges } from "./github";

let challenges: Promise<Challenge[]> | undefined;

/** Loaded once per build and shared by every page. */
export function getChallenges(): Promise<Challenge[]> {
  challenges ??= loadChallenges(GITHUB_TOKEN);
  return challenges;
}
