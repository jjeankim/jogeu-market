import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

export default function QuantitySelect({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className="flex justify-between relative w-full bg-gray-100 p-5 rounded-lg mb-4">
      <span className="text-lg">수량</span>
      <div className="flex items-center">
        <button onClick={onDecrease} className="cursor-pointer">
          <FiMinusCircle size={24} />
        </button>
        <div className="min-w-10 text-center text-lg">{quantity}</div>
        <button onClick={onIncrease} className="cursor-pointer">
          <FiPlusCircle size={24} />
        </button>
      </div>
    </div>
  );
}
