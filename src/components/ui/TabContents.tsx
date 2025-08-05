"use client";
import { useState } from "react";

interface TabsProps {
  tabs: string[];
  content: React.ReactNode[];
}

export default function TabContents({ tabs, content }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-10">
      <div className="flex border-b border-t border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`w-[50%] px-4 py-3 cursor-pointer ${
              activeTab === index ? "text-black font-bold" : "text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4">{content[activeTab]}</div>
    </div>
  );
}
