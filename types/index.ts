export type SafeImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export type HomeSearchBarProps = {
  initialLocation?: string;
  initialGuests?: string;
  initialAdults?: string;
  initialChildren?: string;
  initialInfants?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
};

export type ActivePanel = "where" | "when" | "who" | null;
