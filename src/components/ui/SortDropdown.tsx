import clsx from "clsx";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

type Option = {
  label: string;
  value: string;
};

interface SortDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({ options, value, onChange }: SortDropdownProps) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center gap-6 px-3 py-1.5 min-w-[120px] rounded-md bg-white text-gray-700 text-sm "
      >
        {selected?.label}
        <FiChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-[80%] bg-white border border-gray-200 rounded-md shadow z-10">
          {options.map((option, i) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={clsx(
                "w-full px-4 py-2 text-sm text-center hover:bg-gray-100",
                i !== 0 && "border-t border-gray-200",
                option.value === value
                  ? "font-semibold text-[#405DE6]"
                  : "text-gray-600"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
