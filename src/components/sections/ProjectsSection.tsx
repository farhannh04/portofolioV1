"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  GitFork,
  Star,
  Code2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import type { GitHubRepo } from "@/data/types";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  PHP: "#4F5D95",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "Jupyter Notebook": "#DA5B0B",
  Blade: "#f7523f",
};

export default function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: GitHubRepo[]) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const displayed = showAll ? repos : repos.slice(0, 6);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm mb-4">
            Portofolio
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Proyek GitHub
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Koleksi proyek yang telah saya kerjakan dan publikasikan di GitHub
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm text-slate-600">Memuat proyek...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <p className="text-sm text-slate-600">
              Gagal memuat proyek. Silakan coba lagi nanti.
            </p>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <FolderGit2 className="w-8 h-8 text-slate-400" />
            <p className="text-sm text-slate-600">Belum ada proyek.</p>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {displayed.map((repo) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={cardVariants}
                  className="group relative z-10 p-6 rounded-3xl bg-card border border-border shadow-sm cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-500/50 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h4 className="font-bold text-lg leading-tight mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                    {repo.name}
                  </h4>

                  <p className="text-sm text-slate-600 mb-4 flex-grow line-clamp-2">
                    {repo.description || "Tidak ada deskripsi"}
                  </p>

                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              LANGUAGE_COLORS[repo.language] || "#6b7280",
                          }}
                        />
                        <span className="text-xs text-slate-600">
                          {repo.language}
                        </span>
                      </div>
                    )}
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <Star className="w-3.5 h-3.5" />
                        {repo.stargazers_count}
                      </div>
                    )}
                    {repo.forks_count > 0 && (
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forks_count}
                      </div>
                    )}
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <div className="flex items-center justify-center mt-10">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card text-sm font-semibold text-slate-800 hover:border-blue-500/50 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>@{PORTFOLIO_DATA.personal.github.split("/").pop()}</span>
                <span className="w-px h-4 bg-border" />
                <span className="text-xs font-medium text-slate-500 group-hover:text-blue-500">
                  {repos.length} Repos
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </a>
            </div>

            {repos.length > 6 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card text-sm font-semibold text-slate-800 hover:border-blue-500/50 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Code2 className="w-4 h-4" />
                  {showAll
                    ? "Tampilkan Lebih Sedikit"
                    : `Lihat Semua ${repos.length} Proyek`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
