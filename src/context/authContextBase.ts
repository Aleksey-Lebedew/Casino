import { createContext } from 'react';
import type { AuthenticatedUser, LoginData } from '../api/authAPi';

export type AuthLoginResult =
    | { success: true }
    | { success: false; message: string; requiresActivation?: boolean };

export interface AuthContextValue {
    user: AuthenticatedUser | null;
    isLoading: boolean;
    error: string;
    login: (credentials: LoginData) => Promise<AuthLoginResult>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
