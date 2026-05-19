"use client";

import type { SortKey } from "@/lib/project-utils";

type FilterBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  language: string;
  onLanguageChange: (value: string) => void;
  languages: string[];
  selectedTopics: string[];
  onToggleTopic: (topic: string) => void;
  topicOptions: string[];
  sortBy: SortKey;
  onSortByChange: (value: SortKey) => void;
  onClearFilters: () => void;
  resultCount: number;
  totalCount: number;
};

const sortLabels: Record<SortKey, string> = {
  stars: "Most Stars",
  forks: "Most Forks",
  recent: "Recently Updated",
  submission: "Newest Submission",
};

export function FilterBar({
  query,
  onQueryChange,
  language,
  onLanguageChange,
  languages,
  selectedTopics,
  onToggleTopic,
  topicOptions,
  sortBy,
  onSortByChange,
  onClearFilters,
  resultCount,
  totalCount,
}: FilterBarProps) {
  return (
    <div className="glass-panel-strong sticky top-20 z-30 rounded-3xl px-4 py-4 shadow-glow sm:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              Search
            </span>
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Title, description, author"
              className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-white/35 focus:border-maroon-300/40 focus:bg-black/45"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              Language
            </span>
            <select
              value={language}
              onChange={(event) => onLanguageChange(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-maroon-300/40 focus:bg-black/45"
            >
              <option value="All languages">All languages</option>
              {languages.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              Sort
            </span>
            <select
              value={sortBy}
              onChange={(event) =>
                onSortByChange(event.target.value as SortKey)
              }
              className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-maroon-300/40 focus:bg-black/45"
            >
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-col gap-3 text-sm text-[var(--muted)] lg:items-end">
          <div className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-white/55">
            {resultCount.toLocaleString()} of {totalCount.toLocaleString()}{" "}
            projects
          </div>
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--text)] transition hover:border-maroon-300/40 hover:bg-maroon-500/15"
          >
            Clear filters
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
        <div className="flex flex-wrap gap-2">
          {topicOptions.map((topic) => {
            const active = selectedTopics.includes(topic);

            return (
              <button
                key={topic}
                type="button"
                onClick={() => onToggleTopic(topic)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "border-maroon-300/50 bg-maroon-500/25 text-[var(--text)]"
                    : "border-white/10 bg-black/25 text-[var(--muted)] hover:border-white/20 hover:text-[var(--text)]"
                }`}
                aria-pressed={active}
              >
                {topic}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-white/45">
          Use the chips to narrow projects by shared themes. Multiple topics can
          be active at once.
        </p>
      </div>
    </div>
  );
}
