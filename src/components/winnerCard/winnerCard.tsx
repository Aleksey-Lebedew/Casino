import './WinnerCard.scss'


interface WinnerCardProps {
    image: string;
    nameWinner: string;
    cash: number;
    nameGame: string;
}

export const WinnerCard = (props: WinnerCardProps) => {
    const { image, nameWinner, cash, nameGame } = props

    return (
        <div className="card">
            <div className="img_wrapper">
                <img src={image} alt={nameGame} />
            </div>
            <div className="card_text_wrapper">
                <p className="card_name-winner">{nameWinner}</p>
                <p className="card_cash">₽ {cash.toLocaleString()}</p>
                <p className="card_name-game">{nameGame}</p>
            </div>
        </div>
    )

}