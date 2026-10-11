import { useState } from "react";
import { Link } from "react-router-dom";
import './WinnerCard.scss'
import { PATHS } from "../../share/paths";


interface WinnerCardProps {
    image: string;
    nameWinner: string;
    cash: number;
    nameGame: string;
    winId: string;
}

export const WinnerCard = (props: WinnerCardProps) => {
    const { image, nameWinner, cash, nameGame, winId } = props
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <Link className="card" to={PATHS.winning(winId)}>
            <div className="img_wrapper">
                {image && !imageFailed ? (
                    <img src={image} alt="" onError={() => setImageFailed(true)} />
                ) : (
                    <span className="winner-card__avatar-fallback" aria-hidden="true">
                        {nameWinner.slice(0, 1).toLocaleUpperCase()}
                    </span>
                )}
            </div>
            <div className="card_text_wrapper">
                <p className="card_name-winner">{nameWinner}</p>
                <p className="card_cash">₽ {cash.toLocaleString()}</p>
                <p className="card_name-game">{nameGame}</p>
            </div>
        </Link>
    )

}