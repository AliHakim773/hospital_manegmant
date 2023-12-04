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
            const { username, user_id, role } = action.payload
            return {
                username,
                user_id,
                role,
            }
        },
        clearUser() {
            return {
                username: "",
                user_id: "",
                role: "",
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
