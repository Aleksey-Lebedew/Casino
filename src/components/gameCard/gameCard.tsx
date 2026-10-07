import { useState } from "react";
import Button from "../ui/button/button";
import { Link } from "react-router-dom";
import "./gameCard.scss";

interface GameCardProps {
    image?: string;
    title: string;
    description?: string;
    onPlayClick?: () => void;
    to?: string;
    actionLabel?: string;
    actionDisabled?: boolean;
}

export const GameCard = (props: GameCardProps) => {
    const {
        image,
        title,
        description,
        onPlayClick,
        to,
        actionLabel = "Играть",
        actionDisabled = false,
    } = props;
    const [failedImage, setFailedImage] = useState<string | null>(null);
    const imageIsAvailable = image && failedImage !== image;
    const cardDescription = description || "Описание скоро появится.";
    const cardContent = (
        <>
            <div className="category-card__preview">
                {imageIsAvailable ? (
                    <img
                        src={image}
                        alt={title}
                        className="category-card__img"
                        onError={() => setFailedImage(image)}
                    />
                ) : (
                    <span className="category-card__image-fallback" aria-hidden="true">🎰</span>
                )}
            </div>

            <div className="category-card__content">
                <h3 className="category-card__title">{title}</h3>
                <p className="category-card__desc">{cardDescription}</p>
            </div>
        </>
    );

    return (
        <article className="category-card">
            {to ? (
                <Link to={to} className="category-card__details-link">{cardContent}</Link>
            ) : (
                cardContent
            )}

            <div className="category-card__actions">
                {to ? (
                    <Link to={to} className="btn primary md">{actionLabel}</Link>
                ) : (
                    <Button
                        variant="primary"
                        size="md"
                        onClick={onPlayClick}
                        disabled={actionDisabled}
                    >
                        {actionLabel}
                    </Button>
                )}
            </div>
        </article>
    );

};
