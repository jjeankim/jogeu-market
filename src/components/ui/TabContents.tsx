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
      <div className="flex border-b-2 border-t-2 border-black">
        {tabs.map((tab, index) => (
          <div
            key={tab}
            className="flex justify-center w-[calc(100%/3)] px-4 py-2"
          >
            <button
              onClick={() => setActiveTab(index)}
              className={`w-full cursor-pointer px-10 py-2 rounded-4xl ${
                activeTab === index ? "bg-[#C5A76A] text-white" : "text-black"
              }`}
            >
              {tab}
            </button>
          </div>
        ))}
      </div>
      <div className="p-4">
        {" "}
        {content.map((item, index) => (
          <div key={index} hidden={index !== activeTab}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
