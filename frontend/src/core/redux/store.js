import { configureStore } from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"

const logger = createLogger([])

export const store = configureStore({
    reducer: {},
    middleware: [logger],
})
