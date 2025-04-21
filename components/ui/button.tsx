import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[50px] text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        primary: "bg-black text-white hover:bg-black/90",
        secondary: "bg-white text-black border border-black hover:bg-gray-50",
        button_primary: "bg-black text-white hover:bg-black/90",
        button_secondary:
          "bg-white text-black border border-black hover:bg-gray-50",
      },
      hideIcon: {
        true: "",
        false: "gap-[6px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      hideIcon: false,
    },
  }
);

function Button({
  className,
  variant,
  hideIcon = false,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    hideIcon?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, hideIcon, className }),
        "px-[10px] py-[10px]"
      )}
      {...props}
    >
      <span>
        {children}
        {!hideIcon && <MoveUpRight className="w-4 h-4" />}
      </span>
    </Comp>
  );
}

export { Button, buttonVariants };
