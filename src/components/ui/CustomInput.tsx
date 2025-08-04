import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register: UseFormRegisterReturn;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  label,
  register,
  onChange,
  ...rest
}: CustomInputProps) => {
  return (
    <div className="flex flex-col gap-3 my-3">
      {label && <label htmlFor={rest.id}>{label}</label>}
      <input
        className="bg-gray-50 rounded-[10px] p-4 focus:outline-[#405DE6] "
        {...register}
        {...rest}
        onChange={(e) => {
          register.onChange(e);
          onChange?.(e);
        }}
      />
    </div>
  );
};

export default CustomInput;
