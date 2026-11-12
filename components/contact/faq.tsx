import React from "react";

export interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ items }) => {
  return (
    <div className="max-w-2xl mx-auto my-8 p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Masz pytania? Mamy odpowiedzi.
      </h2>

      <div className="space-y-4">
        {items.map((item) => (
          <details
            key={item.id}
            className="group border border-gray-200 rounded-lg bg-white p-4 [&_summary::-webkit-details-marker]:hidden transition-all duration-200"
          >
            <summary className="flex items-center justify-between font-semibold text-gray-900 cursor-pointer list-none">
              <span>{item.question}</span>
              <span className="transition-transform duration-300 group-open:-rotate-180 text-gray-500">
                <svg
                  fill="none"
                  height="24"
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>

            <p className="mt-3 text-gray-600 leading-relaxed text-sm">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
};
