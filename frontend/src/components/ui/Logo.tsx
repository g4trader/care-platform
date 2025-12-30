import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({ size = 182, className, priority = false }: LogoProps) {
  return (
    <Image
      src="/logo-care-platform.svg"
      alt="Care Platform"
      width={size}
      height={size * 0.23}
      className={className}
      priority={priority}
    />
  );
}

