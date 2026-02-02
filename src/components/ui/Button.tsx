import Link from "next/link";

const baseStyles =
  "inline-flex h-12 min-w-[160px] items-center justify-center rounded-full px-6 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50";

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:opacity-90 focus:ring-primary",
  outline:
    "border border-border text-foreground hover:bg-surface focus:ring-border",
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
