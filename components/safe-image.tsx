"use client";

import { useState } from "react";
import Image from "next/image";
import { FALLBACK_IMAGE_URL } from "@/constants/fallback-image";
import { SafeImageProps } from "@/types";

export default function SafeImage({
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
  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() =>
        setFailedSource((prev) => ({
          ...prev,
          [requestedSource]: true,
        }))
      }
    />
  );
}
