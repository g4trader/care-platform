import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({ size = 273, className, priority = false }: LogoProps) {
  // Proporção do logo: 1080x323 = 3.34:1
  const logoWidth = size;
  const logoHeight = size / 3.34;
  
  return (
    <Image
      src="/logo_principal_horizontal.png"
      alt="Academia de Cuidadores"
      width={1080}
      height={323}
      style={{ width: logoWidth, height: logoHeight }}
      className={className}
      priority={priority}
    />
  );
}

