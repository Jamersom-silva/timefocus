import React from "react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function Button({ variant = "primary", onClick, children, disabled }: ButtonProps) {
  let style = "px-4 py-2 rounded font-bold ";
  if (variant === "primary") style += "bg-blue-500 text-white";
  else if (variant === "secondary") style += "bg-gray-500 text-white";
  else if (variant === "outline") style += "border border-blue-500 text-blue-500";

  return (
    <button onClick={onClick} disabled={disabled} className={style}>
      {children}
    </button>
  );
}
