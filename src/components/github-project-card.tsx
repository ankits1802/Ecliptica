'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Star, GitFork, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';

export type GitHubProject = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  languages: { name: string; value: number }[];
};

export function GitHubProjectCard({ project }: { project: GitHubProject }) {
  // Define a consistent color palette for languages
  const languageColors: { [key: string]: string } = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    Shell: '#89e051',
    'C++': '#f34b7d',
    C: '#555555',
    Dockerfile: '#384d54',
    'Jupyter Notebook': '#DA5B0B',
    // Add more languages and their official colors as needed
  };
  const defaultColor = '#6e7681'; // A neutral fallback color

  const chartData = project.languages.slice(0, 5);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-out hover:shadow-primary/20">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
            <CardTitle className="text-xl">
              <Link href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                {project.name}
              </Link>
            </CardTitle>
            <Link href={project.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors shrink-0">
              <ArrowUpRight className="h-5 w-5" />
            </Link>
        </div>
        <CardDescription className="flex-grow min-h-[40px]">
          {project.description || 'No description provided.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BarChart className="h-4 w-4" /> Language Breakdown (%)
          </h4>
          <div className="h-40">
            {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    width={80}
                    />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--accent))' }}
                        contentStyle={{
                            background: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                            fontSize: '12px'
                        }}
                        formatter={(value: number) => [`${value}%`, 'Usage']}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                       {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={languageColors[entry.name] || defaultColor} />
                        ))}
                    </Bar>
                </RechartsBarChart>
            </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                    No language data available.
                </div>
            )}
        </div>
      </CardContent>
      <CardFooter className="mt-auto border-t pt-4">
          <div className="flex items-center justify-end gap-6 w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{project.stars.toLocaleString()}</span>
            </div>
              <div className="flex items-center gap-1.5">
                <GitFork className="h-4 w-4 text-primary" />
                <span>{project.forks.toLocaleString()}</span>
            </div>
          </div>
      </CardFooter>
    </Card>
  );
}
