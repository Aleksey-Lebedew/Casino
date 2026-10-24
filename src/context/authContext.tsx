import { useEffect, useState, type ReactNode } from 'react';
import {
    clearAuthTokens,
    fetchAuthenticatedUserApi,
    loginUserApi,
    type AuthenticatedUser,
    type LoginData,
} from '../api/authAPi';
import { AuthContext, type AuthLoginResult } from './authContextBase';
import { useBalance } from '../hooks/useBalance';

export function AuthProvider({ children }: { children: ReactNode }) {
    const { removeBalance } = useBalance()
    const [user, setUser] = useState<AuthenticatedUser | null>(null);
    const [isLoading, setIsLoading] = useState(() => Boolean(localStorage.getItem('accessToken')));
    const [error, setError] = useState('');

    useEffect(() => {
        let isActive = true;
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken) {
            return;
        }

        fetchAuthenticatedUserApi(accessToken, refreshToken).then((result) => {
            if (!isActive) return;

            if (result.success) {
                setUser(result.user);
            } else {
                if (result.invalidToken) clearAuthTokens();
                setError(result.message);
            }
            setIsLoading(false);
        });

        return () => {
            isActive = false;
        };
    }, []);

    async function login(credentials: LoginData): Promise<AuthLoginResult> {
        setError('');
        const tokenResult = await loginUserApi(credentials);

        if (!tokenResult.success) {
            return {
                success: false,
                message: tokenResult.message,
                requiresActivation: tokenResult.requiresActivation,
            };
        }

        const userResult = await fetchAuthenticatedUserApi(
            tokenResult.tokens.access,
            tokenResult.tokens.refresh,
        );
        if (!userResult.success) {
            clearAuthTokens();
            setUser(null);
            setError(userResult.message);
            return { success: false, message: userResult.message };
        }

        setUser(userResult.user);
        setError('');
        return { success: true };
    }

    function logout() {
        clearAuthTokens();
        setUser(null);
        setError('');
        removeBalance();
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
