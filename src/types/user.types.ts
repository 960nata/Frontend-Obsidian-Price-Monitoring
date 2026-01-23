export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  PREMIUM = 'PREMIUM',
  FREE = 'FREE',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  subscription?: {
    plan: string;
    isActive: boolean;
    endDate?: string;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}
