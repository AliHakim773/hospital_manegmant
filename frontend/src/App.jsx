import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./styles/index.css"
import Home from "./pages/Home"
import Sginin from "./pages/Signin"

function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <Routes>
                    <Route element={<Home />} path={"/"} />
                    <Route element={<Sginin />} path={"/sign-in"} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
