import { Route, Routes } from 'react-router-dom'
import './App.scss'
import { PATHS } from './share/paths'
import { HomePage } from './pages/homePage/homePage'
import { Layout } from './pages/layout/layout'
import { GamePage } from './pages/gamePage/gamePage'
import { GamesPage } from './pages/gamesPage/gamesPage'
import { ProfilePage } from './pages/profilePage/profilePage'
import { WinningsPage } from './pages/winningsPage/winningsPage'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path={PATHS.games()} element={<GamesPage />} />
          <Route path={PATHS.game(':id')} element={<GamePage />} />
          <Route path={PATHS.allWinnings()} element={<WinningsPage />} />
          <Route path={PATHS.winning(':id')} element={<WinningsPage />} />
          <Route path={PATHS.profile()} element={<ProfilePage />} />
          {/* <Route path={PATHS.main()} element={<SignIn />} /> */}
          {/* <Route path={PATHS.main()} element={<SignUp />} /> */}
        </Route>
      </Routes >
    </>
  )
}

export default App
