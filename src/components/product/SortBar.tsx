import SortDropdown from "@/components/ui/SortDropdown";

interface Props {
  totalItems: number;
  selectedSort: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { label: "최신순", value: "latest" },
  { label: "인기 많은 순", value: "popularity" },
  { label: "낮은 가격 순", value: "lowPrice" },
  { label: "높은 가격 순", value: "highPrice" },
];

const SortBar = ({ totalItems, selectedSort, onChange }: Props) => {
  return (
    <div className="relative flex h-16 items-center justify-between my-3">
      <div className="flex space-x-4">
        총 <span>{totalItems}</span>건
      </div>
      <div className="flex justify-center items-center  ">
        <SortDropdown
          options={sortOptions}
          value={selectedSort}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SortBar;
