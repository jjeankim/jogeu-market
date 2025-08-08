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
    <div className="w-full flex items-center justify-between  mb-4">
      {/* {숨겨진 파일 인풋} */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
        id="file"
      />
      <input
        type="text"
        value={fileName}
        readOnly
        placeholder="첨부파일"
        className="upload-name border border-gray-400 rounded-[10px] px-4 py-0.5 placeholder:text-sm focus:outline-logo"
      />

      <Button
        type="button"
        size="sm"
        onClick={handleClick}
        variant="outlined"
        color="gold"
      >
        파일찾기
      </Button>
    </div>
  );
};

export default CustomFileInput;
