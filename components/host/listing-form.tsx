"use client";

import {
  ListingFieldInput,
  ListingFieldTextarea,
} from "@/components/host/listing-form-fields";
import { ListingFormSubmit } from "@/components/host/listing-form-submit";
import { ListingGalleryUploader } from "@/components/host/listing-gallery-uploader";
import { useState } from "react";

type ListingFormProps = {
  action: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  submittingLabel?: string;
  initialValues?: {
    title: string;
    category: string;
    description: string;
    locationValue: string;
    pricePerNight: number;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    imageSrc: string;
    imageGallery: string[];
  };
};

export function ListingForm({
  action,
  submitLabel = "Publish listing",
  submittingLabel = "Publishing...",
  initialValues,
}: ListingFormProps) {
  const [galleryImages, setGalleryImages] = useState<string[]>(
    initialValues
      ? Array.from(
          new Set(
            [
              ...(initialValues.imageGallery ?? []),
              ...(initialValues.imageSrc ? [initialValues.imageSrc] : []),
            ].filter(Boolean),
          ),
        ).slice(0, 10)
      : [],
  );
  const [uploadError, setUploadError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (galleryImages.length === 0) {
      event.preventDefault();
      setUploadError(
        "Upload at least one image. The first image is used as the cover photo.",
      );
    }
  }

  return (
    <form
      action={action}
      onSubmit={handleSubmit}
      className="mt-4 grid gap-3 md:grid-cols-2"
    >
      <ListingFieldInput
        name="title"
        label="Title"
        placeholder="Stylish loft near downtown"
        defaultValue={initialValues?.title}
      />
      <ListingFieldInput
        name="category"
        label="Category"
        placeholder="Apartment, villa, cabin..."
        defaultValue={initialValues?.category}
      />

      <ListingGalleryUploader
        images={galleryImages}
        onChange={setGalleryImages}
        error={uploadError}
        onError={setUploadError}
      />

      <ListingFieldTextarea
        name="description"
        label="Description"
        placeholder="Describe what guests can expect from this stay."
        className="md:col-span-2"
        defaultValue={initialValues?.description}
      />
      <ListingFieldInput
        name="locationValue"
        label="Location"
        placeholder="e.g. Miami, United States"
        defaultValue={initialValues?.locationValue}
      />
      <ListingFieldInput
        name="pricePerNight"
        label="Price per night"
        type="number"
        min={10}
        placeholder="250"
        defaultValue={initialValues?.pricePerNight}
      />
      <ListingFieldInput
        name="guestCount"
        label="Guests"
        type="number"
        min={1}
        placeholder="4"
        defaultValue={initialValues?.guestCount}
      />
      <ListingFieldInput
        name="roomCount"
        label="Rooms"
        type="number"
        min={1}
        placeholder="2"
        defaultValue={initialValues?.roomCount}
      />
      <ListingFieldInput
        name="bathroomCount"
        label="Bathrooms"
        type="number"
        min={1}
        placeholder="1"
        defaultValue={initialValues?.bathroomCount}
      />
      <ListingFormSubmit
        submitLabel={submitLabel}
        submittingLabel={submittingLabel}
      />
    </form>
  );
}
