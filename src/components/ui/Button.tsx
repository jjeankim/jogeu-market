import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "filled" | "outline";
}

const Button = ({ children, variant = "filled", ...rest }: ButtonProps) => {
  const baseClass = "w-full text-xl p-4 rounded-[10px] hover:bg-[#3348C7] hover:text-white cursor-pointer";

  const variantClass =
    variant === "filled"
      ? "bg-[#405DE6] text-white"
      : "border border-[#405DE6] hover:bg-[#3348C7] hover:text-white text-[#405DE6] bg-white";

  return (
    <button className={clsx(baseClass, variantClass)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
