import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // corrigido
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn-${variant} btn-${size} disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
