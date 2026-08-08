import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-primary shadow-[4px_4px_0_#BF00FF] hover:shadow-[6px_6px_0_#BF00FF] hover:-translate-x-px hover:-translate-y-px",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border-2 border-[#00F5FF]/50 bg-transparent text-[#F0F0FF] hover:border-[#00F5FF] hover:text-[#00F5FF] hover:shadow-[3px_3px_0_#00F5FF]",
        ghost: "hover:bg-white/5",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20",
        glass:
          "bg-transparent border-2 border-[#00F5FF] text-[#00F5FF] hover:border-[#BF00FF] hover:text-[#BF00FF] shadow-[3px_3px_0_#00F5FF] hover:shadow-[3px_3px_0_#BF00FF]",
        brutalist:
          "bg-[#00F5FF] text-[#0A0A14] border-2 border-[#00F5FF] shadow-[5px_5px_0_#BF00FF] hover:shadow-[7px_7px_0_#BF00FF] hover:-translate-x-0.5 hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
