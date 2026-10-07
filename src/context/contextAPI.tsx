import { useEffect, useState, type ReactNode } from "react";
import { fetchGames, fetchUser, type ApiGame, type ApiUser } from "../api/api";
import { Loader } from "../components/loader/loader";
import { apiContext } from "./apiContext";

export function ApiProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<ApiUser[]>([]);
    const [games, setGames] = useState<ApiGame[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        Promise.all([fetchUser(), fetchGames()])
            .then(([serverUsers, serverGames]) => {
                if (!isActive) return;
                setUsers(serverUsers);
                setGames(serverGames);
            })
            .finally(() => {
                if (isActive) setIsLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, []);

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <apiContext.Provider value={{ usersData: users, gamesData: games}}>
            {children}
        </apiContext.Provider>
    );
}
