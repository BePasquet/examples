import { User } from './user.interface';

export interface Authentication {
  user: User;
  token: string;
}
