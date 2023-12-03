import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    username: "",
    role: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            const { username, role } = action.payload
            return {
                username,
                role,
            }
        },
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer

export const user = userSlice.name

export const extractUserSlice = (global) => {
    return global[user]
}
