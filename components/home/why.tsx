import React from "react";
import { icons, type LucideIcon } from "lucide-react";

export interface WhyItem {
  id: string | number;
  icon: keyof typeof icons;
  title: string;
  description: string;
}

interface WhyProps {
  items: WhyItem[];
}

export const Why: React.FC<WhyProps> = ({ items }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mt-6">
      {items.map((item) => {
        const IconComponent = icons[item.icon] as LucideIcon;
        return (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center"
          >
            <div className="bg-[#fadab1] text-[#D6A568] p-5 rounded-full">
              {IconComponent && <IconComponent size={48} />}
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-center">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};
