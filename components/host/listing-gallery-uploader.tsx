"use client";

import { SafeImage } from "@/components/shared/safe-image";
import { useImageUpload } from "@/lib/uploads/client";
import { ImageUp } from "lucide-react";
import { useState } from "react";

type ListingGalleryUploaderProps = {
  images: string[];
  onChange: (images: string[]) => void;
  error: string;
  onError: (message: string) => void;
};

export function ListingGalleryUploader({
  images,
  onChange,
  error,
  onError,
}: ListingGalleryUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const { startUpload, isUploading } = useImageUpload({
    onClientUploadComplete: (res) => {
      const urls = (res ?? [])
        .map((item) => item?.ufsUrl || item?.url || "")
        .filter(Boolean);
      onChange(Array.from(new Set([...images, ...urls])).slice(0, 10));
      onError("");
    },
    onUploadError: (uploadError) => onError(uploadError.message),
  });

  async function handleFileUpload(files: FileList | File[] | null) {
    const list = files ? Array.from(files) : [];
    if (list.length === 0) return;
    if (images.length + list.length > 10) {
      onError("You can upload up to 10 images per listing.");
      return;
    }
    if (list.some((file) => !file.type.startsWith("image/"))) {
      onError("Please upload an image file.");
      return;
    }
    if (list.some((file) => file.size > 4 * 1024 * 1024)) {
      onError("Image must be 4MB or smaller.");
      return;
    }
    onError("");
    await startUpload(list.slice(0, 10 - images.length));
  }

  return (
    <div className="border-ink-200 bg-surface-muted/40 rounded-2xl border p-3 md:col-span-2 md:p-4">
      <p className="text-ink-800 mb-2 text-sm font-medium">Listing gallery</p>

      <label
        className={`flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 text-center transition ${
          isDragActive
            ? "border-brand-400 bg-brand-50/40"
            : "border-ink-300 bg-surface hover:border-brand-300"
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragActive(true);
        }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragActive(false);
          void handleFileUpload(event.dataTransfer.files);
        }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => {
            void handleFileUpload(event.target.files);
            event.currentTarget.value = "";
          }}
        />
        <ImageUp className="text-brand-500 h-6 w-6" />
        <p className="text-ink-800 text-sm font-semibold">
          Drag and drop images, or click to upload
        </p>
        <p className="text-ink-500 text-xs">
          Up to 10 images, each max 4MB {isUploading ? "• Uploading..." : ""}
        </p>
      </label>

      <input
        type="hidden"
        name="imageSrc"
        key={`imageSrc-${images[0] ?? "none"}`}
        defaultValue={images[0] ?? ""}
      />
      <input
        type="hidden"
        name="imageGallery"
        key={`imageGallery-${JSON.stringify(images)}`}
        defaultValue={JSON.stringify(images)}
      />

      {images.length > 0 ? (
        <div className="mt-3 space-y-2">
          <p className="text-sm text-emerald-700">
            {images.length} image{images.length > 1 ? "s" : ""} ready.
          </p>
          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <div key={`${image}-${index}`} className="relative">
                <SafeImage
                  src={image}
                  alt={`Uploaded listing image ${index + 1}`}
                  width={240}
                  height={160}
                  className="border-ink-200 h-16 w-24 rounded-lg border object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    onChange(images.filter((item) => item !== image))
                  }
                  className="border-ink-200 bg-surface text-ink-700 hover:bg-ink-100 absolute -top-1.5 -right-1.5 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold"
                  aria-label={`Remove image ${index + 1}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-ink-600 mt-2 text-sm">
          Upload at least one image. The first image is used as the cover photo.
        </p>
      )}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
