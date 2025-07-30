import { FiSearch } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="relative">
      <input className="w-full border rounded-md p-2" />
      <FiSearch
        size={24}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
      />
      <FiXCircle
        size={24}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
      />
    </div>
  );
};

export default SearchBar;
