import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  varient?: "filled" | "outline";
}

const Button = ({ children, varient = "filled", ...rest }: ButtonProps) => {
  const baseClass =
    "w-full text-xl p-4 rounded-[10px] cursor-pointer";

  const variantClass =
    varient === "filled"
      ? "bg-[#405DE6] text-white"
      : "border border-[#405DE6] text-[#405DE6] bg-white";

  return (
    <button className={clsx(baseClass, variantClass)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
