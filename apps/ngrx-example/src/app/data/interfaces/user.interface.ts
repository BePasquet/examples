export interface User {
  id: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  planId: string;
  progress: number;
  height?: number;
  weight?: number;
  address?: string;
  zipCode?: string;
  name?: string;
  phoneNumber?: string;
  privacyPolicy?: boolean;
}
