import { createContext } from "react";
import type { ApiGame, ApiUser } from "../api/api";

interface ApiContextType {
    usersData: ApiUser[];
    gamesData: ApiGame[];
}

export const apiContext = createContext<ApiContextType>({
    usersData: [],
    gamesData: [],
});