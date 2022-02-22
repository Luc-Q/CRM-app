import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = { 
    isAuthed: false 
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login: (state) => {
            state.isAuthed = true
        },
        logout: (state) => {
            state.isAuthed = false
        }
    }
})

const initialTokenState ={
    tokenType: '',
    token: ''
}

const tokenSlice = createSlice({
    name: 'token',
    initialState: initialTokenState,
    reducers: {
        removeTokenType: (state) => {
            state.tokenType = localStorage.removeItem('tokenType')
        },
        removeToken: (state) => {
            state.token = localStorage.removeItem('token')
        },
        removeTRef: (state) => {
            state.token = localStorage.removeItem('tRef')
        },
        removeAll: (state) => {
            state.token = localStorage.clear()
        }
    }
})

const store = configureStore({
    reducer: {auth: authSlice.reducer, token: tokenSlice.reducer}
})

export const authActions = authSlice.actions
export const tokenActions = tokenSlice.actions

export default store