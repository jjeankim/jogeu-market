import { ChangeEventHandler, InputHTMLAttributes, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register: UseFormRegisterReturn;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type: string;
}

const CustomInput = ({
  type,

  label,
  register,
  onChange,
  ...rest
}: CustomInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClickVisible = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-3 my-3">
      {label && <label htmlFor={rest.id}>{label}</label>}
      <div className="relative">
        <input
          type={isVisible ? "text" : type}
          className="w-full bg-gray-50 rounded-[10px] p-4 focus:outline-logo "
          {...register}
          {...rest}
          onChange={(e) => {
            register.onChange(e);
            onChange?.(e);
          }}
        />
        {type === "password" && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 "
            type="button"
            onClick={handleClickVisible}
          >
            {isVisible ? <FiEye /> : <FiEyeOff />}
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
