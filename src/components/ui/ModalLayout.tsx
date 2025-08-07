import { ModalLayoutProps } from "@/types/my/settings";
import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

const ModalLayout = ({ children, onClose }: ModalLayoutProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        ref={modalRef}
        className="relative bg-white shadow-2xl rounded-xl p-8 w-full max-w-sm"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FiX size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
