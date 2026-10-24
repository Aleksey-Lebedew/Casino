import { Logo } from "../ui/logo/logo"
import { Link, useNavigate } from "react-router-dom"
import { PATHS } from "../../share/paths"
import { useAuth } from "../../hooks/useAuth"
import './header.scss'
import { BalanceDisplay } from "../BalanceDisplay/BalanceDisplay"

interface HeaderProps {
    isMenuOpen: boolean;
    onMenuToggle: () => void;
}

export const Header = ({ isMenuOpen, onMenuToggle }: HeaderProps) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="container header__container" >
                <Logo />
                <button
                    className={`header__menu-toggle${isMenuOpen ? " is-open" : ""}`}
                    type="button"
                    aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-navigation"
                    onClick={onMenuToggle}
                >
                    <span />
                    <span />
                    <span />
                </button>
                <div className="header_wrapper">
                    <Link className="btn secondary md header__profile-link" to={PATHS.profile()}>
                        Личный кабинет
                    </Link>
                    <div className="header__auth">
                        {user ? (
                            <>
                                <BalanceDisplay />
                                <span className="header__username">{user.username}</span>
                                <button className="btn secondary md" type="button" onClick={logout}>
                                    Выйти
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="btn secondary md" to={`${PATHS.profile()}?auth=login`}>
                                    Войти
                                </Link>
                                <Link className="btn primary md" to={`${PATHS.profile()}?auth=register`}>
                                    Регистрация
                                </Link>
                            </>
                        )}
                    </div>
                    <button
                        className="header__mobile-auth"
                        type="button"
                        onClick={() => navigate(user ? PATHS.profile() : `${PATHS.profile()}?auth=login`)}
                    >
                        {user ? user.username : 'Войти'}
                    </button>
                </div>
            </div>
        </header>
    )
}