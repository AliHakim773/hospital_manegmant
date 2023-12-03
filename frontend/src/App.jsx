import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Sginin from "./pages/Signin"

import "./styles/index.css"
import { Provider } from "react-redux"
import { store } from "./core/redux/store"

function App() {
    return (
        <Provider store={store}>
            <div className='app'>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Home />} path={"/"} />
                        <Route element={<Sginin />} path={"/sign-in"} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    )
}

export default App
