import Link from "next/link";

const baseStyles =
  "btn-shine inline-flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-full px-8 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50";

const variants = {
  primary: [
    "bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#ea580c]",
    "bg-[length:200%_100%]",
    "text-white font-semibold",
    "shadow-[0_0_20px_rgba(234,88,12,0.3)]",
    "hover:shadow-[0_0_30px_rgba(234,88,12,0.5)]",
    "hover:bg-right",
    "transition-all duration-500",
    "focus:ring-primary/50",
  ].join(" "),
  outline: [
    "border border-border",
    "text-foreground",
    "hover:border-[#ea580c]/50",
    "hover:shadow-[0_0_15px_rgba(234,88,12,0.15)]",
    "hover:text-primary",
    "transition-all duration-300",
    "focus:ring-border",
  ].join(" "),
} as const;

type ButtonVariant = keyof typeof variants;

type ButtonBaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  type?: never;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const Button = ({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const styles = `${baseStyles} ${variants[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={styles}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={styles} {...rest}>
      {children}
    </button>
  );
}

export default Button;
