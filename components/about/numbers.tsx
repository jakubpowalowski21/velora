import React from "react";
import { icons, type LucideIcon } from "lucide-react";

export interface NumbersItem {
  id: string | number;
  icon: keyof typeof icons;
  number: string;
  description: string;
}

interface NumbersProps {
  items: NumbersItem[];
}

export const Numbers: React.FC<NumbersProps> = ({ items }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-6 w-full">
      {items.map((item) => {
        const IconComponent = icons[item.icon] as LucideIcon;
        return (
          <div
            key={item.id}
            className="flex flex-col items-center justify-around w-full"
          >
            <div className="text-[#D6A568]">
              {IconComponent && <IconComponent size={48} />}
            </div>
            <h3 className="text-2xl font-bold">{item.number}</h3>
            <p className="text-center">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};
