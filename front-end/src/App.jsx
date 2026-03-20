import { Route, Routes} from "react-router-dom"
import { Home } from "./pages/Home"
import { Units } from "./pages/Units"
import { Characters } from "./pages/Characters"
import { Music } from "./pages/Music"
import { MainLayout } from "./layout/mainlayout"
import { NotFound } from "./pages/NotFound"
import { CharacterProfile } from "./pages/CharacterProfile"

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music />} />
        <Route path="/units" element={<Units />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterProfile/>}/>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
