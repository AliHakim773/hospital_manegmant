import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./core/redux/store"

import Home from "./pages/Home"
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"

import "./styles/index.css"
import Admin from "./pages/admin"

function App() {
    return (
        <Provider store={store}>
            <div className='app'>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Home />} path={"/"} />
                        <Route element={<Signin />} path={"/sign-in"} />
                        <Route element={<Signup />} path={"/sign-up"} />
                        <Route element={<Admin />} path={"/admin"} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    )
}

export default App
