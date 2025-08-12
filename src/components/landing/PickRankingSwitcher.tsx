import { useState, useEffect } from "react";
import { PickRankingSwitcherProps } from "@/lib/apis/product";

// interface PickRankingSwitcherProps {
//   onSelect: (rank: number) => void;
// }

const PickRankingSwitcher: React.FC<PickRankingSwitcherProps> = ({
  onSelect,
}) => {
  const [currentRank, setCurrentRank] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRank((prev) => (prev % 5) + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (rank: number) => {
    setCurrentRank(rank);
    onSelect(rank);
  };

  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((rank) => (
        <button
          key={rank}
          onClick={() => handleClick(rank)}
          className={`rounded-full w-8 h-8 border ${
            currentRank === rank ? "bg-yellow-400 text-white" : "bg-gray-200"
          }`}
        >
          {rank}
        </button>
      ))}
    </div>
  );
};

export default PickRankingSwitcher;
