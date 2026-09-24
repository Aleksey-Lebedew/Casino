import { Header } from "../components/header/header"

export const Main = () => {
    
    return (<div className="app">
        <Header />

        <div className="app_body">
            {/* <Sidebar/> */}

            <main className='app_content'>
                {/* <MainContent/> */}
            </main>

        </div>
    </div>
    )
}