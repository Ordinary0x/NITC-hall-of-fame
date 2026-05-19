export type ProjectRecord = {
  repoUrl: string;
  title: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  license: string | null;
  lastUpdated: string;
  screenshots: string[];
  thumbnail: string;
  author: {
    login: string;
    name: string;
    avatarUrl: string;
    profileUrl: string;
    bio: string | null;
  };
  submissionOrder: number;
  readmeMarkdown?: string;
  readmeTitle?: string;
  readmeDescription?: string;
};

export type SortKey = "stars" | "forks" | "recent" | "submission";

export function parseRepoUrl(repoUrl: string) {
  const match = repoUrl.match(
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i,
  );

  if (!match) {
    return null;
  }

  return {
    owner: decodeURIComponent(match[1]),
    repo: decodeURIComponent(match[2]),
  };
}

export function resolveProjectPath(repoUrl: string) {
  const parts = parseRepoUrl(repoUrl);

  if (!parts) {
    return null;
  }

  return `/projects/${encodeURIComponent(parts.owner)}/${encodeURIComponent(parts.repo)}`;
}

export function getProjectBySlug(
  projects: ProjectRecord[],
  owner: string,
  repo: string,
) {
  return projects.find((project) => {
    const parts = parseRepoUrl(project.repoUrl);
    return parts?.owner === owner && parts.repo === repo;
  });
}

export function getAvailableLanguages(projects: ProjectRecord[]) {
  return Array.from(
    new Set(projects.map((project) => project.language).filter(Boolean)),
  ).sort((left, right) => left.localeCompare(right));
}

export function getAllTopics(projects: ProjectRecord[]) {
  return Array.from(
    new Set(projects.flatMap((project) => project.topics ?? [])),
  ).sort((left, right) => left.localeCompare(right));
}

export function collectCatalogStats(projects: ProjectRecord[]) {
  return {
    count: projects.length,
    stars: projects.reduce((total, project) => total + (project.stars ?? 0), 0),
    contributors: new Set(projects.map((project) => project.author.login)).size,
  };
}

export function formatUpdatedDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function sortProjects(projects: ProjectRecord[], sortBy: SortKey) {
  const sorted = [...projects];

  sorted.sort((left, right) => {
    if (sortBy === "forks") {
      return right.forks - left.forks;
    }

    if (sortBy === "recent") {
      return (
        new Date(right.lastUpdated).getTime() -
        new Date(left.lastUpdated).getTime()
      );
    }

    if (sortBy === "submission") {
      return (right.submissionOrder ?? 0) - (left.submissionOrder ?? 0);
    }

    return right.stars - left.stars;
  });

  return sorted;
}
