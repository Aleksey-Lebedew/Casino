const BASE_URL = 'https://studapi.teachmeskills.by';

export interface AuthenticatedUser {
    id?: number | string;
    username: string;
    email: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface TokenResponse {
    access: string;
    refresh: string;
}

export type LoginResult =
    | { success: true; tokens: TokenResponse }
    | { success: false; message: string; requiresActivation?: boolean };

type ApiResult =
    | { success: true }
    | { success: false; message: string };

type UserResult =
    | { success: true; user: AuthenticatedUser }
    | { success: false; message: string; invalidToken: boolean };

async function getErrorMessage(response: Response) {
    try {
        const data: unknown = await response.json();

        if (typeof data === 'object' && data !== null) {
            if ('detail' in data && typeof data.detail === 'string') {
                return data.detail;
            }

            return Object.values(data)
                .flatMap((value) => Array.isArray(value) ? value : [value])
                .filter((value): value is string => typeof value === 'string')
                .join(' ');
        }
    } catch {
        return '';
    }

    return '';
}

export async function registerUserApi(user: RegisterData): Promise<ApiResult> {
    try {
        const response = await fetch(`${BASE_URL}/auth/users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...user,
                username: user.username.trim(),
                email: user.email.trim(),
            }),
        });

        if (!response.ok) {
            return {
                success: false,
                message: await getErrorMessage(response) || `Ошибка регистрации (${response.status})`,
            };
        }

        return { success: true };
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        return { success: false, message: 'Не удалось подключиться к серверу' };
    }
}

export async function loginUserApi(credentials: LoginData): Promise<LoginResult> {
    try {
        const response = await fetch(`${BASE_URL}/auth/jwt/create/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: credentials.email.trim(),
                password: credentials.password,
            }),
        });

        if (!response.ok) {
            const message = await getErrorMessage(response);
            return {
                success: false,
                message: response.status === 401
                    ? 'Не удалось войти. Проверьте email и пароль.'
                    : message || `Ошибка входа (${response.status})`,
                requiresActivation: response.status === 401,
            };
        }

        const tokens: TokenResponse = await response.json();
        localStorage.setItem('accessToken', tokens.access);
        localStorage.setItem('refreshToken', tokens.refresh);

        return { success: true, tokens };
    } catch (error) {
        console.error('Ошибка входа:', error);
        return { success: false, message: 'Не удалось подключиться к серверу' };
    }
}

export async function resendActivationEmailApi(email: string): Promise<ApiResult> {
    try {
        const response = await fetch(`${BASE_URL}/auth/users/resend_activation/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.trim() }),
        });

        if (!response.ok) {
            return {
                success: false,
                message: await getErrorMessage(response) || `Ошибка отправки письма (${response.status})`,
            };
        }

        return { success: true };
    } catch (error) {
        console.error('Ошибка отправки письма:', error);
        return { success: false, message: 'Не удалось подключиться к серверу' };
    }
}

export async function activateUserApi(uid: string, token: string): Promise<ApiResult> {
    try {
        const response = await fetch(`${BASE_URL}/auth/users/activation/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid, token }),
        });

        if (!response.ok) {
            return {
                success: false,
                message: await getErrorMessage(response) || `Ошибка активации (${response.status})`,
            };
        }

        return { success: true };
    } catch (error) {
        console.error('Ошибка активации:', error);
        return { success: false, message: 'Не удалось подключиться к серверу' };
    }
}

async function getProfile(accessToken: string) {
    return fetch(`${BASE_URL}/auth/users/me/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
}

export async function fetchAuthenticatedUserApi(
    accessToken: string,
    refreshToken: string | null,
): Promise<UserResult> {
    try {
        let response = await getProfile(accessToken);

        if (response.status === 401 && refreshToken) {
            const refreshResponse = await fetch(`${BASE_URL}/auth/jwt/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (!refreshResponse.ok) {
                return { success: false, message: 'Сессия истекла. Войдите снова.', invalidToken: true };
            }

            const tokens: { access: string; refresh?: string } = await refreshResponse.json();
            localStorage.setItem('accessToken', tokens.access);
            if (tokens.refresh) localStorage.setItem('refreshToken', tokens.refresh);
            response = await getProfile(tokens.access);
        }

        if (!response.ok) {
            return {
                success: false,
                message: response.status === 401
                    ? 'Сессия истекла. Войдите снова.'
                    : `Не удалось загрузить профиль (${response.status})`,
                invalidToken: response.status === 401,
            };
        }

        const user: AuthenticatedUser = await response.json();
        return { success: true, user };
    } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
        return { success: false, message: 'Не удалось подключиться к серверу', invalidToken: false };
    }
}

export function clearAuthTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}
