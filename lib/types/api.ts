export type ApplicationStatus =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Application {
  id: string;
  userId: string;
  companyName: string;
  roleTitle: string;
  status: ApplicationStatus;
  location: string | null;
  jobUrl: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  notes: string | null;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  applicationId: string;
  fromStatus: ApplicationStatus | null;
  toStatus: ApplicationStatus;
  note: string | null;
  createdAt: string;
}

export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface SuccessResponse<T = unknown> {
  status_code: number;
  success: boolean;
  message: string;
  data: T | null;
  meta: Record<string, unknown> | null;
  error: null;
}

export interface ErrorResponse {
  status_code: number;
  success: false;
  message: string;
  data: null;
  meta: null;
  error: {
    code: string;
    details: string | Array<{ field: string; message: string }>;
  };
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface MeResponse {
  user: User;
}

export interface StatsResponse {
  totalApplications: number;
  byStatus: Record<ApplicationStatus, number>;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateApplicationInput {
  companyName: string;
  roleTitle: string;
  status?: ApplicationStatus;
  location?: string;
  jobUrl?: string;
  salaryMin?: number;
  salaryMax?: number;
  notes?: string;
}

export interface UpdateApplicationInput {
  companyName?: string;
  roleTitle?: string;
  status?: ApplicationStatus;
  location?: string | null;
  jobUrl?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  notes?: string | null;
}

export interface UpdateStatusInput {
  status: ApplicationStatus;
  note?: string;
}

export interface ListApplicationsFilters {
  status?: ApplicationStatus;
  companyName?: string;
  location?: string;
  page?: number;
  limit?: number;
}
