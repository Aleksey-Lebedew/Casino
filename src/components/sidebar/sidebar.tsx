import { Link } from "react-router-dom"



export const Sidebar = () => {
    return (
        <ul className="sideBar_list">
            <Link to={""}><li className="li">Главная</li></Link>
            <Link to={""}><li className="li">Игры</li></Link>
            <Link to={""}><li className="li">Все выигрыши</li></Link>
            <Link to={""}><li className="li">Профиль</li></Link>
        </ul>
    )
}