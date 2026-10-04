const BASE_URL = 'https://6ac24a693f4ae78f6944f196.mockapi.io/';


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

export const fetchUser = () => request('users');
export const fetchGames = () => request('games');