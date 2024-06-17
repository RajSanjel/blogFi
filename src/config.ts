const API_END_POINT = "http://localhost:3000/api";

const API_CONFIG = {
    // auth configs 
    signup: `${API_END_POINT}/auth/register`,
    login: `${API_END_POINT}/auth/login`,
    logout: `${API_END_POINT}/auth/logout`,

    // meida configs 
    uploadMeida: `${API_END_POINT}/media/upload`,

    // get req configs
    getUser: `${API_END_POINT}/get/user`,
}

export default API_CONFIG;