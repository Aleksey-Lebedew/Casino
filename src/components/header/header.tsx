import { Logo } from "../ui/logo/logo"
import Button from "../ui/button/button"
import './header.scss'

export const Header = () => {
    return (
        <header className="header">
            <div className="container header__container" >
                <Logo />
                <div className="header_wrapper">
                    <div className="header__auth">
                        <Button variant='secondary'>Войти</Button>
                        <Button variant='primary'>Регистрация</Button>
                    </div>
                </div>
            </div>
        </header>
    )
}