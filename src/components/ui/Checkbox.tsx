"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { TickIcon } from "./Icons";

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  label: React.ReactNode;
};

export function Checkbox({
  label,
  className,
  id,
  checked,
  disabled,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "inline-flex cursor-pointer items-center gap-[13px] font-ui text-[17px] font-light text-ink",
        disabled && "cursor-not-allowed text-muted-disabled",
        className,
      )}
    >
      <span className="relative inline-flex h-[22px] w-[22px] shrink-0">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="peer absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...props}
        />
        <span
          className={cn(
            "flex h-[22px] w-[22px] items-center justify-center rounded-check border border-hairline-25 bg-background",
            "transition-colors duration-hover ease-out",
            "peer-hover:border-olive",
            "peer-focus-visible:shadow-focus-input",
            "[&_svg]:opacity-0",
            "peer-checked:border-olive peer-checked:bg-olive peer-checked:[&_svg]:opacity-100",
            "peer-disabled:border-hairline-12 peer-disabled:bg-surface-alt",
          )}
        >
          <TickIcon size={13} className="text-cream" />
        </span>
      </span>
      <span>{label}</span>
    </label>
  );
}
