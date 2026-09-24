import { NavLink } from "react-router-dom"
import { PATHS } from "../../share/paths";
import './sideBar.scss'

const menuItems = [
    { id: 'main', label: 'Главная', path: PATHS.main },
    { id: 'games', label: 'Игры', path: PATHS.groups },
    { id: 'promo', label: 'Все выигрыши', path: PATHS.counter },
    { id: 'profile', label: 'Профиль', path: PATHS.profile }
];

export const Sidebar = () => {


    return (
        <div className="container">
            <aside className="aside">
                <ul className="sideBar_list">
                    {menuItems.map((item) => (
                        <li className="aside_link" key={item.id}><NavLink to={item.path()}>{item.label}</NavLink></li>
                    ))}
                </ul>
            </aside>
        </div>

    )
}
