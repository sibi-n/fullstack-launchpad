export type Train = {
  trainId: number;
  name: string;
  source: string;
  destination: string;
  startTime: Date;
  endTime: Date;
  totalSeats: number;
  availableSeats: number;
  price?: number;
  isActive?: number | boolean;
};

export type BookingHistory = {
  trainId: number;
  name: string;
  source: string;
  destination: string;
  startTime: Date;
  endTime: Date;
  seatCount: number;
};
