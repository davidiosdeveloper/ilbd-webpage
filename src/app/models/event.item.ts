export interface EventItem {
  image: string;
  title: string;
  description: string;
  location?: string;
  locationSecond?: string;
  date?: string;

  subtitle?: string;
  ctaText?: string;
  id?: string | number;
}

export interface MonthMarker {
  label: string;
  index: number; // primer item de ese mes
}