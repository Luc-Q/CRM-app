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

const initialTokenState = {
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

const initialUsersListState = {
    users: []
}

const usersListSlice = createSlice({
    name: 'userList',
    initialState: initialUsersListState,
    reducers: {
        setUser: (state, action) => {
            state.users = action.payload
        }
    }
})

const initialMoadalState = {
    isShowed: false
}

const modalSlice = createSlice({
    name: 'moadal',
    initialState: initialMoadalState,
    reducers: {
        showModal: (state) => {
            state.isShowed = true
        },
        hideModal: (state) => {
            state.isShowed = false
        }
    }
})

const initailPageState = {
    refresh: false
}
const pageSlice = createSlice({
    name: 'page',
    initialState: initailPageState,
    reducers: {
        refreshPage: (state) => {
            state.refresh = !state.refresh
        }
    }
})

const store = configureStore({
    reducer: {auth: authSlice.reducer, token: tokenSlice.reducer, usersList: usersListSlice.reducer, modal: modalSlice.reducer, page: pageSlice.reducer}
})

export const authActions = authSlice.actions
export const tokenActions = tokenSlice.actions
export const usersActions = usersListSlice.actions
export const modalActions = modalSlice.actions
export const pageActions = pageSlice.actions

export default store