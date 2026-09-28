import Button from "../ui/button/button";
import "./gameCard.scss";

interface GameCardProps {
    image: string;
    title: string;
    description: string;
    onPlayClick?: () => void;
}


export const GameCard = (props: GameCardProps) => {
    const { image, title, description, onPlayClick } = props;


    return (
        <div className="category-card">
            <div className="category-card__preview">
                <img src={image} alt={title} className="category-card__img" />
            </div>

            <div className="category-card__content">
                <h3 className="category-card__title">{title}</h3>
                <p className="category-card__desc">{description}</p>

                <div className="category-card__actions">
                    <Button variant="primary" size="md" onClick={onPlayClick}>
                        Играть
                    </Button>
                </div>
            </div>
        </div>
    );
};
