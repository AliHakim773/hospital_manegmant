import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./core/redux/store"

import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

import "./styles/index.css"

function App() {
    return (
        <Provider store={store}>
            <div className='app'>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Home />} path={"/"} />
                        <Route element={<Signin />} path={"/sign-in"} />
                        <Route element={<Signup />} path={"/sign-up"} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    )
}

export default App
