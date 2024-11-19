export type Train = {
  trainId: number;
  name: string;
  source: string;
  destination: string;
  startTime: Date;
  endTime: Date;
  totalSeats: number;
  availableSeats: string;
  price?: number;
  isActive?: number | boolean;
};
