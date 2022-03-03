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

const initialUsersState = {
    users: []
}
const usersSlice = createSlice({
    name: 'userList',
    initialState: initialUsersState,
    reducers: {
        setUser: (state, action) => {
            state.users = action.payload
        },
        removeUser: (state, action) => {
            const arrIds = action.payload
            state.users = state.users.filter((user) => !arrIds.includes(user.id))
            // state.users = state.users.filter((user) => user.id !== arrIds)
        }
    }
})

const initialMoadalState = {
    isFormModalShowed: false,
    isViewModalShowed: false
}
const modalSlice = createSlice({
    name: 'moadal',
    initialState: initialMoadalState,
    reducers: {
        showFormModal: (state) => {
            state.isFormModalShowed = true
        },
        hideFormModal: (state) => {
            state.isFormModalShowed = false
        },
        showViewModal: (state) => {
            state.isViewModalShowed = true
        },
        hidViewModal: (state) => {
            state.isViewModalShowed = false
        }
    }
})

const initailPageState = {
    refresh: false,
    loading: false,
    isAdd: false,
}
const pageSlice = createSlice({
    name: 'page',
    initialState: initailPageState,
    reducers: {
        refreshPage: (state) => {
            state.refresh = !state.refresh
        },
        isLoading: (state) => {
            state.loading = true
        },
        isNotLoading: (state) => {
            state.loading = false
        },
        isAddClicked: (state) => {
            state.isAdd = true
        },
        isAddNotClicked: (state) => {
            state.isAdd = false
        },
    }
})

const store = configureStore({
    reducer: {auth: authSlice.reducer, token: tokenSlice.reducer, users: usersSlice.reducer, modal: modalSlice.reducer, page: pageSlice.reducer}
})

export const authActions = authSlice.actions
export const tokenActions = tokenSlice.actions
export const usersActions = usersSlice.actions
export const modalActions = modalSlice.actions
export const pageActions = pageSlice.actions

export default store