import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label className="font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
