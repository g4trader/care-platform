import { CareType } from "./Caregiver";

export type RequestStatus = "open" | "matched" | "closed";

export interface ClientRequest {
  id: string;
  clientId: string;
  careType: CareType;
  schedule: {
    startDate: string;
    endDate?: string;
    timeSlots: string[]; // ex: ["08:00-12:00", "14:00-18:00"]
  };
  location: {
    address: string;
    city: string;
    state: string;
  };
  details: string;
  status: RequestStatus;
  interestedCaregivers: string[]; // IDs dos cuidadores interessados
  createdAt: Date;
  updatedAt: Date;
}

