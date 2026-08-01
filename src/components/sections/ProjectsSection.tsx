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

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const [hovered, setHovered] = useState(false);
  const langColor = LANGUAGE_COLORS[repo.language || ""] || "#6b7280";

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block"
    >
      <motion.div
        className="relative h-full p-5 bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden flex flex-col"
        animate={{
          borderColor: hovered ? `${langColor}40` : "rgba(255,255,255,0.05)",
          y: hovered ? -4 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at top left, ${langColor}08, transparent 70%)` }}
        />

        <div className="relative flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <motion.div
              className="p-2 rounded-lg"
              style={{
                backgroundColor: hovered ? `${langColor}20` : "rgba(59,130,246,0.1)",
                color: hovered ? langColor : "#60a5fa",
              }}
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <FolderGit2 className="w-4 h-4" />
            </motion.div>
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 5 }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink className="w-3.5 h-3.5 text-foreground/40" />
            </motion.div>
          </div>

          <h4 className="font-semibold text-sm text-foreground group-hover:text-blue-400 transition-colors mb-1.5 leading-tight">
            {repo.name}
          </h4>

          <p className="text-xs text-foreground/40 mb-4 flex-grow line-clamp-2">
            {repo.description || "Tidak ada deskripsi"}
          </p>

          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {repo.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="text-[10px] font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 pt-3 border-t border-white/5">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: langColor }}
                />
                <span className="text-[11px] text-foreground/50">{repo.language}</span>
              </div>
            )}
            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-1 text-[11px] text-foreground/40">
                <Star className="w-3 h-3" />
                {repo.stargazers_count}
              </div>
            )}
            {repo.forks_count > 0 && (
              <div className="flex items-center gap-1 text-[11px] text-foreground/40">
                <GitFork className="w-3 h-3" />
                {repo.forks_count}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}

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

  const displayed = showAll ? repos : repos.slice(0, 6);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium mb-4"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            Portofolio
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Proyek GitHub
            </span>
          </h2>
          <p className="text-sm text-foreground/50 mt-3 max-w-md mx-auto">
            Koleksi proyek yang telah saya kerjakan dan publikasikan di GitHub
          </p>
        </motion.div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            <p className="text-sm text-foreground/50">Memuat proyek...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <p className="text-sm text-foreground/50">Gagal memuat proyek. Silakan coba lagi nanti.</p>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <FolderGit2 className="w-6 h-6 text-foreground/30" />
            <p className="text-sm text-foreground/50">Belum ada proyek.</p>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {displayed.map((repo, index) => (
                <RepoCard key={repo.id} repo={repo} index={index} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <motion.a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-xl text-sm font-medium text-foreground/70 hover:border-blue-500/30 hover:text-blue-400 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>@{PORTFOLIO_DATA.personal.github.split("/").pop()}</span>
                <span className="w-px h-4 bg-white/10" />
                <span className="text-xs text-foreground/40">{repos.length} Repos</span>
                <ExternalLink className="w-3 h-3 text-foreground/30" />
              </motion.a>

              {repos.length > 6 && (
                <motion.button
                  onClick={() => setShowAll(!showAll)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-colors"
                >
                  <Code2 className="w-4 h-4" />
                  {showAll ? "Tampilkan Sedikit" : `Lihat Semua ${repos.length} Proyek`}
                </motion.button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
