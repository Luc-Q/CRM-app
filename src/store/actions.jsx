import MalihAuth from "../apis/MalihAuth"
import { usersActions } from "./index"

export const getAccessToken = (payload) => {
    return async dispatch => {
        const sendPostRequest = async () => {
            const res = await MalihAuth.post('auth/signin', payload)
            const { accessToken, tokenType } = res.data
            localStorage.setItem('token', accessToken)
            localStorage.setItem('tokenType', tokenType)
        }
        const sendRequest = async () => {
            const res = await MalihAuth.get('getUserState/id/23')
            localStorage.setItem('tRef', res.data.data.tenantReference)
        }

        try{
            await sendPostRequest()
            await sendRequest()
        } catch(error) {
            console.log(error)
        }
    }
}

export const getData = () => {
    return async dispatch => {
        const sendGetRequest = async () => {
            const res = await MalihAuth.get('getAllUploadedEmails/listId/480')
            const data = res.data
            return data
        }

        try {
        const userData = await sendGetRequest()
        // console.log(data)
        dispatch(usersActions.setUser(userData))
        } catch(error) {
            console.log(error)
        }
    }
}