import { Link } from "react-router-dom"
import logo from '../../../assets/logo.svg'
import './logo.scss'
import { PATHS } from "../../../share/paths"

export const Logo = () => {
    return (

        <Link to={PATHS.main()} className="logo_casino">
            <div className="logo_wrapper">
                <img src={logo} alt="logo_casino" />
            </div>
            <p className="logo_name">casino</p>
        </Link>
    )
}