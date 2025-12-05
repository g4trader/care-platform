import { ClientRequest, RequestStatus } from "../models/ClientRequest";
import { CareType } from "../models/Caregiver";

// Armazenamento em memória
let clientRequests: ClientRequest[] = [];
let nextRequestId = 1;

export const clientRequestsService = {
  create: (data: Omit<ClientRequest, "id" | "status" | "interestedCaregivers" | "createdAt" | "updatedAt">): ClientRequest => {
    const now = new Date();
    const request: ClientRequest = {
      ...data,
      id: `request-${nextRequestId++}`,
      status: "open",
      interestedCaregivers: [],
      createdAt: now,
      updatedAt: now,
    };
    clientRequests.push(request);
    return request;
  },

  findById: (id: string): ClientRequest | undefined => {
    return clientRequests.find((r) => r.id === id);
  },

  getAll: (filters?: { clientId?: string; caregiverId?: string }): ClientRequest[] => {
    let result = [...clientRequests];

    if (filters?.clientId) {
      result = result.filter((r) => r.clientId === filters.clientId);
    }

    if (filters?.caregiverId) {
      result = result.filter((r) => r.interestedCaregivers.includes(filters.caregiverId!));
    }

    return result;
  },

  addInterest: (requestId: string, caregiverId: string): ClientRequest | null => {
    const request = clientRequests.find((r) => r.id === requestId);
    if (!request) return null;

    if (!request.interestedCaregivers.includes(caregiverId)) {
      request.interestedCaregivers.push(caregiverId);
      request.updatedAt = new Date();
    }

    return request;
  },

  update: (id: string, data: Partial<Omit<ClientRequest, "id" | "createdAt">>): ClientRequest | null => {
    const index = clientRequests.findIndex((r) => r.id === id);
    if (index === -1) return null;

    clientRequests[index] = {
      ...clientRequests[index],
      ...data,
      updatedAt: new Date(),
    };
    return clientRequests[index];
  },
};

