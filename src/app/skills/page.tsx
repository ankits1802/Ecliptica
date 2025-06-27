
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { skillsData } from '@/data/skills';
import { SkillItem } from '@/components/skill-item';

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Skills & Technologies</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A comprehensive overview of my technical expertise.
        </p>
      </header>

      <div className="space-y-12">
        {skillsData.map((category) => (
          <Card key={category.name} className="shadow-lg transition-shadow duration-300 overflow-hidden">
            <CardHeader className="bg-card/50 border-b">
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl text-primary">
                <category.icon className="h-7 w-7 md:h-8 md:w-8" />
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {category.skills.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.skills.map((skill) => (
                    <SkillItem key={skill.name} skill={skill} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Details coming soon.</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
