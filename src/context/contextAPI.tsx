import { createContext, useEffect, useState, type ReactNode } from "react";
import { fetchGames, fetchUser } from "../api/api";
import { Loader } from "../components/loader/loader";


interface ApiContextType {
    usersData: any[];
    gamesData: any[];
}

export const apiContext = createContext<ApiContextType>({
    usersData: [],
    gamesData: [],
});

export function ApiProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState([]);
    const [games, setGames] = useState([]);
    useEffect(() => {
        Promise.all([fetchUser(), fetchGames()
        ]).then(([serverUsers, serverGames]) => {
            setUsers(serverUsers);
            setGames(serverGames);
        });
    }, []);
    if(users.length === 0 || games.length === 0){
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
