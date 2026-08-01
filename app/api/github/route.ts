import { NextResponse } from "next/server";
import type { GitHubRepo } from "@/data/types";

const GITHUB_USERNAME = "farhannh04";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

let cachedData: GitHubRepo[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000;

export async function GET() {
  const now = Date.now();

  if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
    return NextResponse.json(cachedData);
  }

  try {
    const res = await fetch(
      `${GITHUB_API}?sort=updated&per_page=100&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "portofolio-app",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      if (cachedData) return NextResponse.json(cachedData);
      return NextResponse.json([], { status: res.status });
    }

    const repos: GitHubRepo[] = await res.json();

    const filtered = repos
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        topics: repo.topics || [],
        updated_at: repo.updated_at,
        fork: repo.fork,
      }));

    cachedData = filtered;
    cacheTimestamp = now;

    return NextResponse.json(filtered);
  } catch {
    if (cachedData) return NextResponse.json(cachedData);
    return NextResponse.json([], { status: 500 });
  }
}
