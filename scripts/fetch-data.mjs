import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const PROJECTS_FILE = path.join(ROOT, "projects.json");
const OUTPUT_FILE = path.join(ROOT, "public", "data", "projects-data.json");
const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
]);

function stripMarkdown(markdown) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractReadmeMetadata(markdown, fallbackTitle, fallbackDescription) {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const titleMatch = normalized.match(/^#\s+(.+)$/m);
  const blocks = normalized
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  let description = "";

  for (const block of blocks) {
    if (block.startsWith("# ")) continue;
    if (block.startsWith("## ")) break;
    if (block.startsWith("```")) continue;

    description = stripMarkdown(block);
    if (description) break;
  }

  return {
    title: titleMatch ? titleMatch[1].trim() : fallbackTitle,
    description: description || fallbackDescription || fallbackTitle,
  };
}

function githubHeaders(token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "NITC-Hall-of-Fame",
  };

  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function githubGet(endpoint, token) {
  const res = await fetch(`https://api.github.com${endpoint}`, {
    headers: githubHeaders(token),
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${endpoint} failed with ${res.status}: ${body}`);
  }

  return res.json();
}

async function githubGetFileContent(owner, repo, filePath, token) {
  const file = await githubGet(
    `/repos/${owner}/${repo}/contents/${filePath}`,
    token,
  );

  if (!file?.content) return null;

  return Buffer.from(file.content, file.encoding || "base64").toString("utf8");
}

function rawUrl(owner, repo, branch, filePath) {
  const encodedPath = filePath
    .split("/")
    .map((s) => encodeURIComponent(s))
    .join("/");
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${encodedPath}`;
}

async function loadProjectsFile() {
  const raw = await fs.readFile(PROJECTS_FILE, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed))
    throw new Error("projects.json must contain an array");
  return parsed;
}

function parseRepositoryUrl(repoUrl) {
  const match = repoUrl.match(
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i,
  );
  if (!match) return null;
  return {
    owner: decodeURIComponent(match[1]),
    repo: decodeURIComponent(match[2]),
  };
}

function parseAuthorUrl(authorUrl) {
  const match = authorUrl.match(/^https?:\/\/github\.com\/([^/]+)\/?$/i);
  if (!match) return null;
  return decodeURIComponent(match[1]);
}

function createPlaceholderSvg(label) {
  const safeLabel = String(label).replace(/[<>]/g, "").slice(0, 48);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#6f1818"/>
          <stop offset="100%" stop-color="#111013"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#g)"/>
      <circle cx="960" cy="160" r="120" fill="#c04f4f" fill-opacity=".16"/>
      <circle cx="220" cy="520" r="180" fill="#f5efe4" fill-opacity=".06"/>
      <text x="80" y="300" fill="#f5efe4" font-family="Menlo, monospace" font-size="54" font-weight="700">${safeLabel}</text>
      <text x="80" y="370" fill="#f5efe4" font-family="Menlo, monospace" font-size="24" opacity=".82">No images were provided</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

async function fetchProject(entry, index, token) {
  const repoUrl = String(entry.project ?? "").trim();
  const authorUrl = String(entry.author ?? "").trim();
  const submissionDescription = String(entry.description ?? "").trim();
  const repository = parseRepositoryUrl(repoUrl);
  const authorLogin = parseAuthorUrl(authorUrl);

  if (!repository || !authorLogin || !submissionDescription) {
    console.warn(`[fetch-data] Skipping invalid entry at index ${index + 1}`);
    return null;
  }

  let repoData = null;
  try {
    repoData = await githubGet(
      `/repos/${repository.owner}/${repository.repo}`,
      token,
    );
  } catch (err) {
    console.warn(
      `[fetch-data] Failed to fetch repository metadata for ${repository.owner}/${repository.repo}: ${err.message}`,
    );
    return null;
  }

  if (!repoData) {
    console.warn(
      `[fetch-data] Repository not found: ${repository.owner}/${repository.repo}`,
    );
    return null;
  }

  const defaultBranch = repoData.default_branch || "main";
  const fallbackDescription = repoData.description || "";

  // README
  let readmeMarkdown = "";
  let readmeTitle = repoData.name || repository.repo;
  let readmeDescription = fallbackDescription;

  try {
    const hofContents = await githubGet(
      `/repos/${repository.owner}/${repository.repo}/contents/hof`,
      token,
    );

    if (hofContents) {
      readmeMarkdown =
        (await githubGetFileContent(
          repository.owner,
          repository.repo,
          "hof/readme.md",
          token,
        )) ||
        (await githubGetFileContent(
          repository.owner,
          repository.repo,
          "hof/README.md",
          token,
        ));
    }

    if (!readmeMarkdown) {
      const readme = await githubGet(
        `/repos/${repository.owner}/${repository.repo}/readme`,
        token,
      );

      if (readme?.content) {
        readmeMarkdown = Buffer.from(
          readme.content,
          readme.encoding || "base64",
        ).toString("utf8");
      }
    }

    if (readmeMarkdown) {
      const metadata = extractReadmeMetadata(
        readmeMarkdown,
        repoData.name || repository.repo,
        fallbackDescription,
      );
      readmeTitle = metadata.title;
      readmeDescription = metadata.description;
    } else {
      console.warn(
        `[fetch-data] README missing for ${repository.owner}/${repository.repo}`,
      );
    }
  } catch (err) {
    console.warn(
      `[fetch-data] Failed to fetch README for ${repository.owner}/${repository.repo}: ${err.message}`,
    );
  }

  // images: read from hof/ first, then fall back to root-level images/
  let images = [];
  try {
    const collectImages = (contents, basePath) => {
      if (!Array.isArray(contents)) return [];

      const thumbnailFiles = contents
        .filter(
          (item) =>
            item?.type === "file" &&
            item.name.startsWith("thumbnail.") &&
            IMAGE_EXTENSIONS.has(path.extname(item.name).toLowerCase()),
        )
        .sort((a, b) => a.name.localeCompare(b.name));

      const otherImageFiles = contents
        .filter(
          (item) =>
            item?.type === "file" &&
            item.name !== "readme.md" &&
            item.name !== "README.md" &&
            !item.name.startsWith("thumbnail.") &&
            IMAGE_EXTENSIONS.has(path.extname(item.name).toLowerCase()),
        )
        .sort((a, b) => a.name.localeCompare(b.name));

      return [...thumbnailFiles, ...otherImageFiles].map((file) => {
        const filePath = basePath ? `${basePath}/${file.name}` : file.path;
        return rawUrl(
          repository.owner,
          repository.repo,
          defaultBranch,
          filePath,
        );
      });
    };

    const hofContentsForImages = await githubGet(
      `/repos/${repository.owner}/${repository.repo}/contents/hof`,
      token,
    );

    images = collectImages(hofContentsForImages, "hof");

    if (images.length === 0) {
      const legacyContents = await githubGet(
        `/repos/${repository.owner}/${repository.repo}/contents/images`,
        token,
      );
      images = collectImages(legacyContents, "images");
    }

    if (images.length === 0)
      console.warn(
        `[fetch-data] No images found in hof/ or images/ for ${repository.owner}/${repository.repo}`,
      );
  } catch (err) {
    console.warn(
      `[fetch-data] Failed to list images for ${repository.owner}/${repository.repo}: ${err.message}`,
    );
  }

  // author
  let authorData = null;
  try {
    authorData = await githubGet(`/users/${authorLogin}`, token);
  } catch (err) {
    console.warn(
      `[fetch-data] Failed to fetch author profile for ${authorLogin}: ${err.message}`,
    );
  }

  const thumbnail =
    images[0] || createPlaceholderSvg(repoData.name || repository.repo);
  const fallbackAvatar =
    repoData.owner?.avatar_url ||
    `https://avatars.githubusercontent.com/${authorLogin}`;

  return {
    repoUrl,
    title: readmeTitle,
    description: submissionDescription,
    stars: repoData.stargazers_count || 0,
    forks: repoData.forks_count || 0,
    language: repoData.language || "",
    topics: Array.isArray(repoData.topics) ? repoData.topics : [],
    license: repoData.license?.spdx_id || null,
    lastUpdated: repoData.pushed_at || new Date().toISOString(),
    screenshots: images,
    thumbnail,
    author: {
      login: authorLogin,
      name: authorData?.name || repoData.owner?.login || authorLogin,
      avatarUrl: authorData?.avatar_url || fallbackAvatar,
      profileUrl: authorData?.html_url || authorUrl,
      bio: authorData?.bio || null,
    },
    submissionOrder: index + 1,
    readmeMarkdown,
    readmeTitle,
    readmeDescription,
  };
}

async function main() {
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_API_TOKEN || "";
  const entries = await loadProjectsFile();
  const resolved = [];

  for (const [index, entry] of entries.entries()) {
    const project = await fetchProject(entry, index, token);
    if (project) resolved.push(project);
  }

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(
    OUTPUT_FILE,
    `${JSON.stringify(resolved, null, 2)}\n`,
    "utf8",
  );
  console.log(
    `Wrote ${resolved.length} projects to ${path.relative(ROOT, OUTPUT_FILE)}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
