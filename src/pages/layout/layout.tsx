import { Outlet, useLocation } from "react-router-dom"
import { Header } from "../../components/header/header"
import { Sidebar } from "../../components/sideBar/sidebar"
import './layout.scss'

export const Layout = () => {
    const { pathname } = useLocation();
    const isRegistrationPage =
        pathname === "/registration" || pathname.startsWith("/registration/");

    return (
        <div className="app">
            <Header />

            <div className="app_body">
                <div className="container">

                    <Sidebar />

                    <main className='app_content'>
                        <Outlet />
                    </main>
                </div>

            </div>

        </div>
    )
}