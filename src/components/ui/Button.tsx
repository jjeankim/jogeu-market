import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "filled" | "outline";
}

const Button = ({ children, variant = "filled", ...rest }: ButtonProps) => {
  const baseClass = "w-full text-xl p-4 rounded-[10px] cursor-pointer";

  const variantClass =
    variant === "filled"
      ? "bg-black text-white"
      : "border border-black text-black bg-white";

  return (
    <button className={clsx(baseClass, variantClass)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
