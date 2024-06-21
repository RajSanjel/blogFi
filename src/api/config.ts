const API_END_POINT = "http://localhost:3000/api";

const API_CONFIG = {

    // auth configs 
    signup: `${API_END_POINT}/auth/register`,
    login: `${API_END_POINT}/auth/login`,
    logout: `${API_END_POINT}/auth/logout`,
    verify: `${API_END_POINT}/auth/verify`,

    // meida configs 
    uploadMeida: `${API_END_POINT}/media/upload`,

    // get req configs
    getUser: `${API_END_POINT}/users/user`,
    getBlog: `${API_END_POINT}/blog/getBlog`,
    getBlogs: `${API_END_POINT}/blog/getBlogs`,
    // post req configs 
    postBlog: `${API_END_POINT}/blog/post`

}

export default API_CONFIG;