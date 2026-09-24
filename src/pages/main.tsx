import { Header } from "../components/header/header"
import { Sidebar } from "../components/sideBar/sideBar"

export const Main = () => {

    return (
        <div className="app">
            <Header />

            <div className="app_body">
                <Sidebar />

                <main className='app_content'>
                    {/* <MainContent/> */}
                </main>

            </div>

        </div>
    )
}