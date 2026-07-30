"use client";

import { useState } from "react";

type UploadedImage = {
  url: string;
  ufsUrl: string;
};

type UseImageUploadOptions = {
  onClientUploadComplete?: (files: UploadedImage[]) => void;
  onUploadError?: (error: Error) => void;
};

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

/** Local image upload helper (data URLs). Swap for Cloudinary/S3 in production. */
export function useImageUpload(options: UseImageUploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false);

  async function startUpload(files: File[]) {
    setIsUploading(true);
    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const url = await readFileAsDataUrl(file);
          return { url, ufsUrl: url };
        }),
      );
      options.onClientUploadComplete?.(uploaded);
      return uploaded;
    } catch (error) {
      const err =
        error instanceof Error ? error : new Error("Image upload failed.");
      options.onUploadError?.(err);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }

  return { startUpload, isUploading };
}

/** @deprecated Alias kept for older listing-form call sites */
export function useUploadThing(
  _endpoint: string,
  options: UseImageUploadOptions = {},
) {
  return useImageUpload(options);
}
