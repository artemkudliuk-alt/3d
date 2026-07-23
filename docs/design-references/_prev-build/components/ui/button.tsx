import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-55",
  {
    variants: {
      variant: {
        primary: "bg-brass text-ink hover:bg-cream hover:shadow-[0_0_40px_-8px_var(--color-brass)]",
        outline:
          "border border-cream/25 text-cream hover:border-brass hover:text-brass hover:bg-brass/5",
        ghost: "text-cream/70 hover:text-brass",
      },
      size: {
        sm: "h-10 px-5 text-[13px]",
        md: "h-12 px-7 text-sm",
        lg: "h-14 px-9 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonStyles>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
