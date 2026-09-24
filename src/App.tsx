import { Route, Routes } from 'react-router-dom'
import './App.scss'
import { PATHS } from './share/paths'
import { Main } from './pages/main'
import { Header } from './components/header/header'

function App() {
  return (
    <><Routes>
      <Route path={PATHS.main()} element={<Main />} />
      {/* <Route path={PATHS.main()} element={<SignIn />} /> */}
      {/* <Route path={PATHS.main()} element={<SignUp />} /> */}
      <Route path={PATHS.main()} element={<Main />} />
    </Routes></>
  )
}

export default App
