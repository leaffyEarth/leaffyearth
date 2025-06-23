import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { badgeVariants } from "@/components/ui/badge";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export interface IBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export interface IThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
} 