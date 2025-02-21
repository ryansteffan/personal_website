import React from "react";
import { BentoGrid, BentoGridItem } from "../../ui/bento-grid";

import type { PageItem } from "~/components/types/project_page";

export default function ProjectGrid({ items }: { items: PageItem[] }) {
  return (
    <BentoGrid className="mx-auto max-w-4xl">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
