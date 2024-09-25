import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const variants = cva(
  "flex w-full bg-transparent transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-input shadow-sm focus-visible:ring-1 focus-visible:ring-ring rounded-md",
        inline: "border-none shadow-none h-auto",
      },
      size: {
        default: "h-9 px-3 py-1 text-sm file:text-sm",
        small: "h-7 px-2 py-1 text-sm file:text-sm",
        large: "h-14 px-4 py-2 text-base file:text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> &
  VariantProps<typeof variants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(variants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
