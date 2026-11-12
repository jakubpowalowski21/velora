import React from "react";
import Image from "next/image";

export interface PeopleItem {
  id: string | number;
  photo: string;
  name: string;
  description: string;
}

interface PeopleProps {
  items: PeopleItem[];
}

export const People: React.FC<PeopleProps> = ({ items }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-stretch gap-5 mt-6 w-full">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-between w-full rounded-xl shadow-2xl overflow-hidden bg-white"
        >
          {/* Zdjęcie zajmujące całą górną część karty o stałej wysokości */}
          <div className="relative w-full h-64">
            <Image
              src={item.photo}
              alt={item.name}
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Tekst karty */}
          <div className="p-4 flex flex-col flex-grow justify-between text-center">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
