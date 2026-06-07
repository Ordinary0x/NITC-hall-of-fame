"use client";

import { useDeferredValue, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { ProjectCard } from "@/components/ProjectCard";
import {
  getAllTopics,
  getAvailableLanguages,
  sortProjects,
  type ProjectRecord,
  type SortKey,
} from "@/lib/project-utils";

type ProjectBrowserProps = {
  projects: ProjectRecord[];
};

export function ProjectBrowser({ projects }: ProjectBrowserProps) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All languages");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("stars");
  const deferredQuery = useDeferredValue(query);

  const languages = getAvailableLanguages(projects);
  const topicOptions = getAllTopics(projects);

  const visibleProjects = sortProjects(
    projects.filter((project) => {
      const haystack = [
        project.title,
        project.description,
        ...project.authors.flatMap((a) => [a.name, a.login]),
        project.repoUrl,
      ]
        .join(" ")
        .toLowerCase();

      const queryMatch =
        deferredQuery.trim() === "" ||
        haystack.includes(deferredQuery.trim().toLowerCase());
      const languageMatch =
        language === "All languages" || project.language === language;
      const topicMatch =
        selectedTopics.length === 0 ||
        selectedTopics.some((topic: string) => project.topics.includes(topic));

      return queryMatch && languageMatch && topicMatch;
    }),
    sortBy,
  );

  return (
    <section className="space-y-6">
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        language={language}
        onLanguageChange={setLanguage}
        languages={languages}
        selectedTopics={selectedTopics}
        onToggleTopic={(topic) => {
          setSelectedTopics((current) =>
            current.includes(topic)
              ? current.filter((value: string) => value !== topic)
              : [...current, topic],
          );
        }}
        topicOptions={topicOptions}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onClearFilters={() => {
          setQuery("");
          setLanguage("All languages");
          setSelectedTopics([]);
          setSortBy("stars");
        }}
        resultCount={visibleProjects.length}
        totalCount={projects.length}
      />

      {visibleProjects.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.repoUrl} project={project} />
          ))}
        </div>
      ) : (
        <div className="panel rounded-xl px-6 py-14 text-center sm:px-10">
          <div className="mx-auto max-w-md space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-maroon-500/20 bg-maroon-600/10 text-lg text-maroon-200">
              ✦
            </div>
            <h3 className="font-[var(--font-display)] text-2xl text-[var(--text)]">
              No projects match those filters
            </h3>
            <p className="text-sm leading-6 text-[var(--muted)]">
              Try widening the search, clearing a topic chip, or switching back
              to all languages.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
