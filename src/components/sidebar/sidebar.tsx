import { NavLink } from "react-router-dom"
import { PATHS } from "../../share/paths";
import './sideBar.scss'

const menuItems = [
    { id: 'main', label: 'Главная', path: PATHS.main },
    { id: 'games', label: 'Игры', path: PATHS.games },
    { id: 'promo', label: 'Все крупные выигрыши', path: PATHS.allWinnings },
    { id: 'profile', label: 'Профиль', path: PATHS.profile }
];

export const Sidebar = () => {


    return (
            <aside className="aside">
                <ul className="sideBar_list">
                    {menuItems.map((item) => (
                        <li className="aside_link" key={item.id}><NavLink to={item.path()}>{item.label}</NavLink></li>
                    ))}
                </ul>
            </aside>

    )
}
