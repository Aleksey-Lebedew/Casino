const BASE_URL = 'https://6ac24a693f4ae78f6944f196.mockapi.io/';

export interface ApiGame {
    id: string;
    title: string;
    image?: string;
    description?: string;
}

export interface ApiUser {
    id: string;
    image: string;
    nameWinner: string;
}

export async function request(endpoint: string) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`)
        if (!response.ok) throw new Error(`${response.status}`)            
        return await response.json()
    }
    catch (error) {
        console.log(`error for ${endpoint}`, error)
        return []
    }
}

export const fetchUser = async (): Promise<ApiUser[]> => {
    const users: unknown = await request('users');
    return Array.isArray(users) ? users as ApiUser[] : [];
};

export const fetchGames = async (): Promise<ApiGame[]> => {
    const games: unknown = await request('games');
    return Array.isArray(games) ? games as ApiGame[] : [];
};