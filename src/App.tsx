import { Route, Routes } from 'react-router-dom'
import './App.scss'
import { PATHS } from './share/paths'
import { HomePage } from './pages/homePage/homePage'
import { Layout } from './pages/layout/layout'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />} >
          <Route index element={<HomePage />} />
          {/* <Route path={PATHS.main()} element={<SignIn />} /> */}
          {/* <Route path={PATHS.main()} element={<SignUp />} /> */}
        </Route>
      </Routes >
    </>
  )
}

export default App
