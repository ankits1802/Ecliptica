import { NextResponse, type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensures the route is not statically cached

export async function GET(request: NextRequest) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = 'ankits1802';

  if (!GITHUB_TOKEN) {
    console.error('GitHub token not configured on the server.');
    return NextResponse.json({ error: 'GitHub token not configured on the server.' }, { status: 500 });
  }

  try {
    const repoRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!repoRes.ok) {
        const errorBody = await repoRes.json();
        console.error('Failed to fetch repos:', errorBody.message);
        throw new Error(`Failed to fetch repos: ${repoRes.statusText}`);
    }

    const repos: any[] = await repoRes.json();

    // Filter out forked repos and select top ones based on stars/forks or recent activity
    const sortedRepos = repos
      .filter(repo => !repo.fork && repo.name !== GITHUB_USERNAME) // also filter out the profile README repo
      .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
      .slice(0, 12); // Limit to a reasonable number

    const projects = await Promise.all(
      sortedRepos.map(async (repo) => {
        const langRes = await fetch(repo.languages_url, {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
          next: { revalidate: 3600 } // Cache for 1 hour
        });

        let languages = {};
        if (langRes.ok) {
          languages = await langRes.json();
        } else {
          console.warn(`Failed to fetch languages for ${repo.name}`);
        }
        
        const totalBytes = Object.values(languages).reduce((acc: number, val) => acc + (val as number), 0) as number;

        const languageData = totalBytes > 0 ? Object.entries(languages).map(([name, bytes]) => ({
          name,
          value: parseFloat(((bytes as number / totalBytes) * 100).toFixed(2)),
        })) : [];


        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          languages: languageData,
        };
      })
    );

    return NextResponse.json(projects);
  } catch (error) {
    console.error('GitHub API Route Error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects from GitHub.' }, { status: 500 });
  }
}
