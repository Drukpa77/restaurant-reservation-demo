"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Input({
  label,
  error,
  hint,
  id,
  className,
  disabled,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputId}
        className={cn(
          "mb-2 font-ui text-[12px] font-normal uppercase tracking-kicker",
          error ? "text-error" : "text-muted-subtle",
        )}
      >
        {label}
      </label>
      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "w-full rounded-input bg-background px-[18px] py-4 font-ui text-[17px] font-normal text-ink",
          "border border-hairline-16",
          "placeholder:font-light placeholder:text-muted-subtle",
          "transition-shadow duration-hover ease-out",
          "hover:border-hairline-30",
          "focus:border-olive focus:shadow-focus-input focus:outline-none",
          error &&
            "border-error bg-error-fill hover:border-error focus:border-error focus:shadow-none",
          disabled &&
            "cursor-not-allowed border-hairline-10 bg-surface-alt font-light text-muted-disabled hover:border-hairline-10",
          className,
        )}
        {...props}
      />
      {error ? (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 font-ui text-[13px] font-light text-error"
        >
          <span
            aria-hidden
            className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-error text-[10px] leading-none"
          >
            !
          </span>
          {error}
        </p>
      ) : hint ? (
        <p
          id={`${inputId}-hint`}
          className="mt-1.5 font-ui text-[13px] font-light text-muted-subtle"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function Textarea({
  label,
  error,
  id,
  className,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputId}
        className="mb-2 font-ui text-[12px] font-normal uppercase tracking-kicker text-muted-subtle"
      >
        {label}
      </label>
      <textarea
        id={inputId}
        aria-invalid={error ? true : undefined}
        className={cn(
          "h-24 w-full resize-none rounded-input border border-hairline-16 bg-background px-[18px] py-4 font-ui text-[17px] font-light leading-normal text-ink",
          "placeholder:text-muted-subtle",
          "transition-shadow duration-hover ease-out",
          "hover:border-hairline-30",
          "focus:border-olive focus:shadow-focus-input focus:outline-none",
          error && "border-error bg-error-fill",
          className,
        )}
        {...props}
      />
      {error ? (
        <p role="alert" className="mt-1.5 font-ui text-[13px] font-light text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
