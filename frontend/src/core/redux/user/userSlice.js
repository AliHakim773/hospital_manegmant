import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    username: "",
    userId: "",
    role: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            const { username, userId, role } = action.payload
            return {
                ...state,
                username,
                userId,
                role,
            }
        },
        clearUser(state, action) {
            return {
                ...state,
                username: "",
                userId: "",
                role: "",
            }
        },
    },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer

export const user = userSlice.name

export const extractUserSlice = (global) => {
    return global[user]
}
