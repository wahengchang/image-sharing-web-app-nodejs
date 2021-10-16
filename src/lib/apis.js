import axios from "axios";

const getErrorMessage = (responseFromApi) => {
    try {
        return `[${responseFromApi.response.data.errorCode}]${responseFromApi.response.data.errorMessage}`
    }
    catch(e) {
        return responseFromApi.message
    }
}


export const userLogin = async (username, password) => {
    try {
        const payload = { username, password }
        const res = await axios.post(`/apis/user/login`, payload)
        return res.data
    }
    catch(e) {
        const errorMessage = getErrorMessage(e)
        throw errorMessage
    }
}

export const getMe = async (token) => {
    try {
        const payload = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        const res = await axios.get(`/apis/me`, payload)
        return res.data
    }
    catch(e) {
        const errorMessage = getErrorMessage(e)
        throw errorMessage
    }
}

export const getImageList = async (token) => {
    try {
        const payload = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        const res = await axios.get(`/apis/me`, payload)
        return res.data
    }
    catch(e) {
        const errorMessage = getErrorMessage(e)
        throw errorMessage
    }
}