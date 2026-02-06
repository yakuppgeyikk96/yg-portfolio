"use client";

import type { TechnologyGroup } from "@/types/technology";
import { CategorySection } from "./CategorySection";

type TechnologiesPageContentProps = {
  groups: TechnologyGroup[];
};

export function TechnologiesPageContent({
  groups,
}: TechnologiesPageContentProps) {
  if (groups.length === 0) {
    return null;
  }

  return (
    <div>
      {groups.map((group, index) => (
        <CategorySection key={group.category} group={group} index={index} />
      ))}
    </div>
  );
}

export default TechnologiesPageContent;
