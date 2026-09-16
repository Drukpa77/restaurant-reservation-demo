"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ChevronIcon } from "./Icons";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
};

export function Select({
  label,
  value,
  options,
  onChange,
  placeholder,
  error,
  disabled,
  name,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const generatedId = useId();
  const listId = `${generatedId}-list`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function onDocClick(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="flex flex-col" ref={wrapRef}>
      <label
        id={`${generatedId}-label`}
        className="mb-2 font-ui text-[12px] font-normal uppercase tracking-kicker text-muted-subtle"
      >
        {label}
      </label>
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${generatedId}-label`}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex w-full items-center justify-between rounded-input border border-hairline-16 bg-background px-[18px] py-4 text-left font-ui text-[17px] font-normal text-ink",
          "transition-shadow duration-hover ease-out",
          "hover:border-hairline-30",
          "focus-visible:border-olive focus-visible:shadow-focus-input",
          open && "border-olive shadow-focus-input",
          error && "border-error bg-error-fill",
          disabled && "cursor-not-allowed bg-surface-alt text-muted-disabled",
        )}
      >
        <span className={cn(!selected && "font-light text-muted-subtle")}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronIcon
          size={16}
          className={cn(
            "text-muted transition-transform duration-hover ease-out",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={`${generatedId}-label`}
          className="z-20 mt-2 rounded-input border border-olive bg-background p-2 shadow-dropdown"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={cn(
                    "w-full rounded-[8px] px-3 py-2.5 text-left font-ui text-[15px] font-light text-ink",
                    "transition-colors duration-hover ease-out",
                    "hover:bg-surface",
                    isSelected && "bg-surface font-normal",
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
      {error ? (
        <p role="alert" className="mt-1.5 font-ui text-[13px] font-light text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
