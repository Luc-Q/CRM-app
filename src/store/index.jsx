import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { user: null}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    }
})

const store = configureStore({
    reducer: userSlice.reducer
})

export const userActions = userSlice.actions

export default store