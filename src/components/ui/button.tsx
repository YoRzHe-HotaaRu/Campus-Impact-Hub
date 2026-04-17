import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[3px] border text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/10 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-slate-900 bg-slate-900 text-primary-foreground shadow-[0_12px_24px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:bg-slate-800",
        outline:
          "border-border bg-white text-foreground shadow-[0_10px_24px_rgba(15,23,42,0.08),0_1px_0_rgba(255,255,255,0.6)_inset] hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "border-slate-200 bg-secondary text-secondary-foreground shadow-[0_10px_24px_rgba(15,23,42,0.06)] hover:bg-slate-200/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "border-transparent bg-transparent text-slate-600 shadow-none hover:bg-white hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "border-red-200 bg-red-50 text-red-700 shadow-[0_10px_24px_rgba(127,29,29,0.08)] hover:bg-red-100 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "h-auto border-transparent px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-7 gap-1 rounded-[3px] px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-[3px] px-4 text-[0.82rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2.5 px-6 text-[0.96rem] has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-10",
        "icon-xs":
          "size-7 rounded-[3px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[3px]",
        "icon-lg": "size-12 rounded-[3px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
