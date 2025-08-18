import Button from "@/components/ui/Button";
import { useRef } from "react";

type CustomFileInputProps = {
  onFileSelect: (file: File | null) => void;
  fileName: string;
};

const CustomFileInput = ({ onFileSelect, fileName }: CustomFileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  return (
    <div className="w-full mb-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
        id="file"
      />
      
      {/* 모바일 */}
      <div className="md:hidden space-y-2">
        <input
          type="text"
          value={fileName}
          readOnly
          placeholder="첨부파일"
          className="w-full border border-gray-400 rounded-[10px] px-4 py-2 placeholder:text-sm focus:outline-logo"
        />
        <Button
          type="button"
          size="sm"
          onClick={handleClick}
          variant="outlined"
          color="gold"
          className="w-full"
        >
          파일찾기
        </Button>
      </div>

      {/* 데스크톱 */}
      <div className="hidden md:flex items-center justify-between">
        <input
          type="text"
          value={fileName}
          readOnly
          placeholder="첨부파일"
          className="flex-1 border border-gray-400 rounded-[10px] px-4 py-0.5 placeholder:text-sm focus:outline-logo mr-2"
        />
        <Button
          type="button"
          size="sm"
          onClick={handleClick}
          variant="outlined"
          color="gold"
          className="shrink-0"
        >
          파일찾기
        </Button>
      </div>
    </div>
  );
};

export default CustomFileInput;
