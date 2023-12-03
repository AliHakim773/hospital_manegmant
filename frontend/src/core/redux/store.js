import { configureStore } from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"
import userSlice, { user } from "./user/userSlice"

const logger = createLogger([])

export const store = configureStore({
    reducer: {
        [user]: userSlice,
    },
    middleware: [logger],
})
