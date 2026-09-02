import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.ComponentProps<"select"> {
  placeholder?: string;
}

/**
 * Native <select> styled to match the design system. Keeps the stack lean
 * (no extra Radix dependency) while remaining fully keyboard- and
 * screen-reader-accessible out of the box.
 */
export function Select({ className, placeholder, children, value, defaultValue, ...props }: SelectProps) {
  const valueProps = value !== undefined ? { value } : { defaultValue: defaultValue ?? "" };

  return (
    <div className="relative">
      <select
        className={cn(
          "h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10",
          className,
        )}
        {...valueProps}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
