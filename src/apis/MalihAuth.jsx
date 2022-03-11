const axios = require("axios");

const MalihAuth = axios.create({
    baseURL: "",
});

MalihAuth.interceptors.request.use((config) => {
    config.headers.Authorization = `${getTokenType()} ${
        getToken() ? getToken() : ""
    }`;
    config.headers.tenantReference = getTRef() ? getTRef() : "";
    return config;
});

const getTokenType = () => {
    return localStorage.getItem("tokenType");
};

const getToken = () => {
    return localStorage.getItem("token");
};

const getTRef = () => {
    return localStorage.getItem("tRef");
};

export default MalihAuth;
