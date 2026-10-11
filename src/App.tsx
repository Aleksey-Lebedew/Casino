import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.scss'
import { PATHS } from './share/paths'
import { HomePage } from './pages/homePage/homePage'
import { Layout } from './pages/layout/layout'
import { GamePage } from './pages/gamePage/gamePage'
import { GamesPage } from './pages/gamesPage/gamesPage'
import { ProfilePage } from './pages/profilePage/profilePage'
import { WinningsPage } from './pages/winningsPage/winningsPage'
import { ActivateAccountPage } from './pages/activateAccountPage/activateAccountPage'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />} >
          <Route index element={<HomeRoute />} />
          <Route path={PATHS.games()} element={<GamesPage />} />
          <Route path={PATHS.game(':id')} element={<GamePage />} />
          <Route path={PATHS.allWinnings()} element={<WinningsPage />} />
          <Route path={PATHS.winning(':id')} element={<WinningsPage />} />
          <Route path={PATHS.profile()} element={<ProfilePage />} />
          <Route path={PATHS.activate()} element={<ActivateAccountPage />} />
          {/* <Route path={PATHS.main()} element={<SignIn />} /> */}
          {/* <Route path={PATHS.main()} element={<SignUp />} /> */}
        </Route>
      </Routes >
    </>
  )
}

function HomeRoute() {
  const { hash } = useLocation()
  const activationLink = hash.match(/^#\/activate\/([^/]+)\/([^/?#]+)/)

  if (activationLink) {
    return <Navigate to={`/activate/${activationLink[1]}/${activationLink[2]}`} replace />
  }

  return <HomePage />
}

export default App
