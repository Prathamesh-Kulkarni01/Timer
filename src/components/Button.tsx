import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  variant = "primary",
  ...props
}) => {
  const isPrimary = variant === "primary";
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-gray-700 ${
        isPrimary && `bg-blue-600 text-white  hover:bg-blue-700 `
      } rounded-lg transition-colors shadow-md hover:shadow-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
