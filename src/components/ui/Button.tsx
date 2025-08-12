import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "filled" | "outlined";
  size?: "sm" | "md" | "lg" | "full";
  color?: "black" | "gold"; // 🎯 여기에 테마 추가
}

const Button = ({
  children,
  variant = "filled",
  disabled,
  size = "md",
  color = "black",
  className,
  ...rest
}: ButtonProps) => {
  const baseClass = "rounded-[10px] cursor-pointer leading-none";

  const sizeClass = {
    sm: "text-sm py-2 px-3",
    md: "text-md py-3 px-4",
    lg: "text-lg py-4 px-5",
    full: "w-full text-xl py-4",
  }[size];

  const filledVariants = {
    black: "bg-black text-white hover:opacity-60",
    gold: "bg-[#C5A76A] text-white hover:bg-[#9A8466]",
  };

  const outlinedVariants = {
    black:
      "border-2 border-black text-black bg-white hover:bg-black hover:text-white",
    gold: "border border-[#C5A76A] text-[#C5A76A] bg-white hover:bg-[#C5A76A] hover:text-white",
  };

  const variantClass = !disabled
    ? variant === "filled"
      ? filledVariants[color]
      : outlinedVariants[color]
    : "";

  const disabledClass = disabled
    ? "opacity-50 bg-gray-400 text-white hover:cursor-not-allowed"
    : "";

  return (
    <button
      className={clsx(
        baseClass,
        sizeClass,
        variantClass,
        disabledClass,
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
