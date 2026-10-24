import { NavLink } from "react-router-dom"
import { PATHS } from "../../share/paths";
import './sidebar.scss'

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { id: 'main', label: 'Главная', path: PATHS.main },
    { id: 'games', label: 'Игры', path: PATHS.games },
    { id: 'promo', label: 'Все крупные выигрыши', path: PATHS.allWinnings },
    { id: 'profile', label: 'Профиль', path: PATHS.profile }
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    return (
        <>
            <button
                className={`aside-overlay${isOpen ? " is-open" : ""}`}
                type="button"
                aria-label="Закрыть меню"
                tabIndex={isOpen ? 0 : -1}
                onClick={onClose}
            />
            <aside
                className={`aside${isOpen ? " is-open" : ""}`}
                id="primary-navigation"
                aria-label="Основная навигация"
            >
                <ul className="sideBar_list">
                    {menuItems.map((item) => (
                        <li className="aside_link" key={item.id}>
                            <NavLink to={item.path()} onClick={onClose}>{item.label}</NavLink>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    )
}
