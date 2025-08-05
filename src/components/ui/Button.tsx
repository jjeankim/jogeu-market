import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "filled" | "outlined";
  size?: "sm" | "md" | "lg" | "full";
}

const Button = ({
  children,
  variant = "filled",
  disabled,
  className,
  ...rest
}: ButtonProps) => {
  const baseClass = "text-xl p-4 rounded-[10px] cursor-pointer";
  // const variantClass =
  //   variant === "filled"
  //     ? "bg-black text-white hover:opacity-60 hover:text-white"
  //     : "border hover:bg-[#3348C7] hover:text-white text-black bg-white";
  const variantClass = !disabled
    ? variant === "filled"
      ? "bg-black text-white hover:opacity-60 hover:text-white"
      : "border hover:bg-[#3348C7] hover:text-white text-black bg-white"
    : "";

  const disabledClass = disabled
    ? "opacity-50 bg-gray-400 text-white hover:cursor-not-allowed"
    : "";
  return (
    <button
      className={clsx(baseClass, variantClass, disabledClass, className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export const ButtonSmall = ({
  children,
  variant = "filled",
  disabled,
  className,
  ...rest
}: ButtonProps) => {
  const baseClass = "text-sm p-4 rounded-[10px] cursor-pointer";
  const variantClass =
    variant === "filled"
      ? "bg-logo text-white hover:bg-[#9A8466] hover:text-white "
      : "border border-[#405DE6] hover:bg-[#3348C7] hover:text-white text-[#405DE6] bg-white";

  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed bg-gray-400 text-gray-600 hover:bg-gray-400 hover:text-gray-600"
    : "";

  return (
    <button
      className={clsx(baseClass, variantClass, disabledClass, className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
