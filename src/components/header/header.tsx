import { Logo } from "../ui/logo/logo"
import Button from "../ui/button/button"
import { Link } from "react-router-dom"
import { PATHS } from "../../share/paths"
import './header.scss'

export const Header = () => {
    return (
        <header className="header">
            <div className="container header__container" >
                <Logo />
                <div className="header_wrapper">
                    <Link className="btn secondary md header__profile-link" to={PATHS.profile()}>
                        Личный кабинет
                    </Link>
                    <div className="header__auth">
                        <Button variant='secondary'>Войти</Button>
                        <Button variant='primary'>Регистрация</Button>
                    </div>
                </div>
            </div>
        </header>
    )
}