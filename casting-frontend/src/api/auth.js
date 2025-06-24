import API from './axios'

export const loginUser = async (credentials) => {
    return API.post('/auth/login', credentials);
};

export const registerUser = async (userInfo) => {
    return API.post('/auth/register', userInfo);
};