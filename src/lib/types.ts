export type TimeSlotStatus = "available" | "almost_full" | "full" | "popular";

export type TimeSlot = {
  time: string;
  label: string;
  status: TimeSlotStatus;
  remaining?: number;
};

export type AvailabilityResponse = {
  date: string;
  guests: number;
  closed: boolean;
  slots: TimeSlot[];
};

export type DietaryTag = "V" | "VG" | "GF" | "NUTS" | "SHELLFISH";

export type Dish = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "starters" | "mains" | "vegetarian" | "desserts" | "drinks";
  dietary: DietaryTag[];
  image: string;
  imageCaption: string;
  chefPick?: boolean;
  forTwo?: boolean;
};

export type PreOrderLine = {
  dishId: string;
  qty: number;
};

export type GuestDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  occasion: string;
  requests: string;
  dietary: string[];
  highChair: boolean;
  accessibility: boolean;
  marketingOptIn: boolean;
  policyAccepted: boolean;
};

export type BookingStep = "table" | "preorder" | "details" | "confirm";
export type BookingStatus = "draft" | "submitting" | "confirmed" | "failed";

export type BookingDraft = {
  guests: number;
  date: string | null;
  time: string | null;
  groupMode: boolean;
  groupNoticeAcknowledged: boolean;
  preOrder: PreOrderLine[];
  mealsSelected: number;
  holdExpiresAt: number | null;
  details: GuestDetails;
  step: BookingStep;
  status: BookingStatus;
  reference: string | null;
};

export type Reservation = {
  reference: string;
  guests: number;
  date: string;
  time: string;
  table: string;
  preOrder: PreOrderLine[];
  details: GuestDetails;
  status: "confirmed" | "cancelled";
  createdAt: string;
};
