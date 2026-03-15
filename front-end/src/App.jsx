import { BrowserRouter, Route, Routes} from "react-router"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
