import { User } from '../../data/interfaces/user.interface';

export const AUTHENTICATION_STATE_KEY = 'authentication';

export interface AuthenticationState {
  checked: boolean;
  token: string;
  user: User | null;
}

export interface AuthenticationPartialState {
  [AUTHENTICATION_STATE_KEY]: AuthenticationState;
}
