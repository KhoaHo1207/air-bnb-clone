"use client";

type FieldInputProps = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  min?: number;
  defaultValue?: string | number;
};

export function ListingFieldInput({
  name,
  label,
  placeholder,
  type = "text",
  min,
  defaultValue,
}: FieldInputProps) {
  return (
    <label className="grid gap-1.5">
      <span className="text-ink-600 text-xs font-medium">{label}</span>
      <input
        name={name}
        required
        type={type}
        min={min}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="border-ink-300 text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:ring-brand-100 rounded-xl border px-3 py-2 text-sm transition outline-none focus:ring-2"
      />
    </label>
  );
}

type FieldTextareaProps = {
  name: string;
  label: string;
  placeholder: string;
  className?: string;
  defaultValue?: string;
};

export function ListingFieldTextarea({
  name,
  label,
  placeholder,
  className,
  defaultValue,
}: FieldTextareaProps) {
  return (
    <label className={`grid gap-1.5 ${className ?? ""}`}>
      <span className="text-ink-600 text-xs font-medium">{label}</span>
      <textarea
        name={name}
        required
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={4}
        className="border-ink-300 text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:ring-brand-100 rounded-xl border px-3 py-2 text-sm transition outline-none focus:ring-2"
      />
    </label>
  );
}
