
import type { Skill } from '@/data/skills';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image'; // Import next/image

const proficiencyColors: Record<NonNullable<Skill['level']>, string> = {
  Expert: 'bg-primary/20 text-primary border-primary/30 dark:text-primary-foreground',
  Advanced: 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30', // Cherry red for Advanced
  Proficient: 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30',
  Intermediate: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30',
  Familiar: 'bg-sky-500/20 text-sky-700 dark:text-sky-400 border-sky-500/30',
};

export function SkillItem({ skill }: { skill: Skill }) {
  const badgeContent = skill.level ? (
    <Badge variant="outline" className={`px-3 py-1 text-xs font-semibold whitespace-nowrap ${proficiencyColors[skill.level] || 'bg-secondary text-secondary-foreground border-border'}`}>
      {skill.level}
    </Badge>
  ) : null;

  // Content including logo, name, and badge
  const skillDisplayContent = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        {skill.logoUrl && (
          <Image
            src={skill.logoUrl}
            alt={`${skill.name} logo`}
            width={20}
            height={20}
            className="mr-2 flex-shrink-0"
          />
        )}
        <span className="font-medium text-foreground group-hover:text-primary transition-colors">{skill.name}</span>
      </div>
      {badgeContent}
    </div>
  );

  return (
    <div className="group flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:border-primary/70 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
      {skill.description ? (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="w-full text-left cursor-default">
              {skillDisplayContent}
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="max-w-xs text-sm bg-popover text-popover-foreground border shadow-md rounded-md p-2">
              <p>{skill.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        // If no description, skillDisplayContent directly fills the item
        skillDisplayContent
      )}
    </div>
  );
}

    