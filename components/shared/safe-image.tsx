"use client";

import { useState } from "react";
import Image from "next/image";
import { FALLBACK_IMAGE_URL } from "@/constants/fallback-image";

export type SafeImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export function SafeImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: SafeImageProps) {
  const [failedSource, setFailedSource] = useState<Record<string, boolean>>({});
  const requestedSource = src || FALLBACK_IMAGE_URL;
  const currentSrc = failedSource[requestedSource]
    ? FALLBACK_IMAGE_URL
    : requestedSource;
  const isDataUrl = currentSrc.startsWith("data:");

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized={isDataUrl}
      onError={() =>
        setFailedSource((prev) => ({
          ...prev,
          [requestedSource]: true,
        }))
      }
    />
  );
}

export default SafeImage;
