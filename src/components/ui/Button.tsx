import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="w-full text-xl text-white p-4 rounded-[10px] bg-[#405DE6] cursor-pointer"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
