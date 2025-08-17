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
      <div className="flex border-b-2 border-t-2 border-black overflow-x-auto">
        {tabs.map((tab, index) => (
          <div
            key={tab}
            className="flex justify-center flex-1 min-w-0 px-2 md:px-4 py-2"
          >
            <button
              onClick={() => setActiveTab(index)}
              className={`w-full cursor-pointer px-4 md:px-10 py-2 rounded-4xl text-sm md:text-base whitespace-nowrap ${
                activeTab === index ? "bg-[#C5A76A] text-white" : "text-black"
              }`}
            >
              {tab}
            </button>
          </div>
        ))}
      </div>
      <div className="p-2 md:p-4">
        {content.map((item, index) => (
          <div key={index} hidden={index !== activeTab}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
