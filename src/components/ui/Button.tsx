import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "filled" | "outlined";
  size?: "sm" | "md" | "lg" |"full";
}

const Button = ({
  children,
  variant = "filled",
  disabled,
  size = "md",
  className,
  ...rest
}: ButtonProps) => {
  const baseSizeClass =
    size === "sm"
      ? "text-sm px-3 py-1"
      : size === "lg"
      ? "text-xl px-6 py-3"
      : size === "full"
      ? "w-full text-base px-4 py-2" 
      : "text-base px-4 py-2";

  const variantClass =
    variant === "filled"
      ? "bg-black text-white hover:opacity-60 hover:text-white"
      : "border hover:bg-[#3348C7] hover:text-white text-black bg-white";

  const disabledClass = disabled
    ? "opacity-50  bg-gray-400 text-gray-600 hover:bg-gray-400 hover:text-gray-600 hover:cursor-not-allowed"
    : "";

  return (
    <button
      className={clsx(
        "rounded-[10px] cursor-pointer",
        baseSizeClass,
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
