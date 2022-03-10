import MalihAuth from "../apis/MalihAuth";
import { pageActions, usersActions } from "./index";

export const getAccessTokenAndUsers = (payload) => {
    return async (dispatch) => {
        const sendPostRequest = async () => {
            const res = await MalihAuth.post("auth/signin", payload);
            const { accessToken, tokenType } = res.data;
            localStorage.setItem("token", accessToken);
            localStorage.setItem("tokenType", tokenType);
        };
        const sendRequest = async () => {
            const res = await MalihAuth.get("getUserState/id/23");
            localStorage.setItem("tRef", res.data.data.tenantReference);
        };

        const sendGetRequest = async () => {
            const res = await MalihAuth.get("getAllUploadedEmails/listId/480");
            const data = res.data;
            return data;
        };

        try {
            dispatch(pageActions.isLoading());
            await sendPostRequest();
            await sendRequest();
            const userData = await sendGetRequest();
            const reverseUserData = userData.reverse();
            dispatch(usersActions.setUser(reverseUserData));
            await dispatch(pageActions.isNotLoading());
        } catch (error) {
            console.log(error);
        }
    };
};

export const getUsers = () => {
    return async (dispatch) => {
        const sendGetRequest = async () => {
            const res = await MalihAuth.get("getAllUploadedEmails/listId/480");
            const data = res.data;
            return data;
        };

        try {
            dispatch(pageActions.isLoading());
            const userData = await sendGetRequest();
            const reverseUserData = userData.reverse();
            dispatch(usersActions.setUser(reverseUserData));
            await dispatch(pageActions.isNotLoading());
        } catch (error) {
            console.log(error);
        }
    };
};

export const postUser = (payload) => {
    return async (dispatch) => {
        const sendPostRequest = async () => {
            const res = await MalihAuth.post("emailUpload", payload);
            console.log(res);
        };

        try {
            await sendPostRequest();
            await dispatch(pageActions.refreshPage());
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteUser = (payload) => {
    return async (dispatch) => {
        const sendDeleteRequest = async () => {
            console.log(payload);
            const res = await MalihAuth.delete(`deleteEmails/`, {
                data: payload,
            });
            console.log(res);
        };

        try {
            await sendDeleteRequest();
            await dispatch(usersActions.removeUser(payload));
            await dispatch(pageActions.refreshPage());
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateUser = (payload) => {
    return async (dispatch) => {
        const sendUpdateRequest = async () => {
            const res = await MalihAuth.put("updateEmail", payload);
            console.log(res);
        };

        try {
            await sendUpdateRequest();
            await dispatch(pageActions.refreshPage());
        } catch (error) {
            console.log(error);
        }
    };
};
