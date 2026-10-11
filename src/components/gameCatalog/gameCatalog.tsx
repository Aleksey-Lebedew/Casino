import { Link } from "react-router-dom";
import type { ApiGame } from "../../api/api";
import { GameCard } from "../gameCard/gameCard";
import { PATHS } from "../../share/paths";
import "./gameCatalog.scss";

interface GameCatalogProps {
    title: string;
    games: ApiGame[];
    limit?: number;
    showAllLink?: boolean;
    headingLevel?: "h1" | "h2";
}

const getGameImage = (image: string | undefined, gameId: string) => {
    if (!image) return undefined;
    if (/^https?:\/\/(?:www\.)?picsum\.photos(?:\/|$)/i.test(image)) {
        return `https://picsum.photos/seed/${encodeURIComponent(gameId)}/300/180`;
    }
    return image;
};

export const GameCatalog = ({
    title,
    games,
    limit,
    showAllLink = false,
    headingLevel = "h2",
}: GameCatalogProps) => {
    const visibleGames = limit === undefined ? games : games.slice(0, limit);
    const playableGameId = games[0]?.id;
    const Title = headingLevel;

    return (
        <section className="game-catalog">
            <div className="game-catalog__header">
                <Title className="game-catalog__title">{title}</Title>
                {showAllLink && (
                    <Link className="game-catalog__all-link" to={PATHS.games()}>
                        Полный список игр <span aria-hidden="true">→</span>
                    </Link>
                )}
            </div>

            {visibleGames.length === 0 ? (
                <p className="game-catalog__empty">
                    Игры из каталога пока недоступны.
                </p>
            ) : (
                <div className="game-catalog__grid">
                    {visibleGames.map((game) => {
                        const isPlayable = game.id === playableGameId;

                        return (
                            <GameCard
                                key={game.id}
                                image={getGameImage(game.image, game.id)}
                                title={game.title}
                                description={game.description}
                                to={isPlayable ? PATHS.game(game.id) : undefined}
                                actionLabel={isPlayable ? "Играть" : "Скоро"}
                                actionDisabled={!isPlayable}
                            />
                        );
                    })}
                </div>
            )}
        </section>
    )
};
