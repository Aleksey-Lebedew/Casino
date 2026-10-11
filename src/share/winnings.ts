import type { ApiGame, ApiUser } from "../api/api";

export interface WinRecord extends ApiUser {
    cash: number;
    game?: ApiGame;
}

const generateWinAmount = (id: string) => {
    let hash = 0;

    for (const character of id) {
        hash = Math.imul(hash ^ character.charCodeAt(0), 0x01000193) >>> 0;
    }

    return 10000 + (hash % 400000);
};

export const createWinRecords = (
    users: ApiUser[],
    games: ApiGame[],
): WinRecord[] =>
    users.map((user, index) => ({
        ...user,
        cash: generateWinAmount(user.id),
        game: games.length > 0 ? games[index % games.length] : undefined,
    }));
