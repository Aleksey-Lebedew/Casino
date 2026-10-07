import { useContext } from "react";
import { GameCard } from "../../components/gameCard/gameCard";
import { apiContext } from "../../context/apiContext";
import { PATHS } from "../../share/paths";
import "./gamesPage.scss";

const LUCKY_SLOT = {
    id: "lucky-slot",
    title: "LUCKY SLOT",
    description: "Игровой автомат с тремя барабанами, выигрышными комбинациями и джекпотом 777.",
};

const normalizeTitle = (title: string) => title.trim().toLocaleLowerCase();

export const GamesPage = () => {
    const { gamesData } = useContext(apiContext);
    let hasLuckySlot = false;

    const apiGames = gamesData.flatMap((game) => {
        const isLuckySlot = normalizeTitle(game.title) === normalizeTitle(LUCKY_SLOT.title);
        if (isLuckySlot && hasLuckySlot) return [];
        if (isLuckySlot) hasLuckySlot = true;

        return [{
            id: game.id,
            title: game.title,
            image: game.image ? `${game.image}/150` : undefined,
            description: game.description || "Описание скоро появится.",
            isPlayable: isLuckySlot,
        }];
    });

    const catalogGames = hasLuckySlot
        ? apiGames
        : [
            {
                id: LUCKY_SLOT.id,
                title: LUCKY_SLOT.title,
                image: undefined,
                description: LUCKY_SLOT.description,
                isPlayable: true,
            },
            ...apiGames,
        ];

    return (
        <section className="games-page">
            <h1 className="games-page__title">Все игры</h1>
            {gamesData.length === 0 && (
                <p className="games-page__empty-note">
                    Игры из каталога пока недоступны. LUCKY SLOT уже можно запустить.
                </p>
            )}
            <div className="games-page__grid">
                {catalogGames.map((game) => (
                    <GameCard
                        key={game.id}
                        image={game.image}
                        title={game.title}
                        description={game.description}
                        to={game.isPlayable ? PATHS.game("lucky-slot") : undefined}
                        actionLabel={game.isPlayable ? "Играть" : "Скоро"}
                        actionDisabled={!game.isPlayable}
                    />
                ))}
            </div>
        </section>
    );
};