import { NextResponse } from "next/server";
import type { GitHubRepo } from "@/data/types";

const GITHUB_USERNAME = "farhannh04";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

export async function GET() {
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

    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
