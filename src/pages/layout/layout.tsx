import { Outlet } from "react-router-dom"
import { Header } from "../../components/header/header"
import { Sidebar } from "../../components/sideBar/sidebar"
import './layout.scss'

export const Layout = () => {
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