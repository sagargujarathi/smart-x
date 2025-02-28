import Image from "next/image";
import { useState } from "react";
import { IMAGES } from "@/utils/images";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fill = false,
  priority = false,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? IMAGES.utils.placeholder : src}
      alt={alt}
      className={className}
      fill={fill}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
