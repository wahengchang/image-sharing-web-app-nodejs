import axios from "axios";
import {getCookie} from './cookieHandler'

const getErrorMessage = (responseFromApi, key = 'errorMessage') => {
    try {
        return responseFromApi.response.data[key]
    }
    catch(e) {
        return null
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
        const errorValidation = getErrorMessage(e, 'errors')
        throw {errorMessage, errorValidation}
    }
}

export const userSignup = async (username, password) => {
    try {
        const payload = { username, password }
        const res = await axios.post(`/apis/user/signup`, payload)
        return res.data
    }
    catch(e) {
        const errorMessage = getErrorMessage(e)
        const errorValidation = getErrorMessage(e, 'errors')
        throw {errorMessage, errorValidation}
    }
}

export const getMe = async () => {
    try {
        const token = getCookie('u')
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

export const getImageList = async () => {
    try {
        const token = getCookie('u')
        const payload = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        const res = await axios.get(`/apis/images`, payload)
        return res.data
    }
    catch(e) {
        const errorMessage = getErrorMessage(e)
        throw errorMessage
    }
}


export const uploadImage = async (payload) => {
    try {
        const res = await axios.post(`/upload`, payload)
        return res.data
    }
    catch(e) {
        const errorMessage = getErrorMessage(e)
        throw errorMessage
    }
}

export const createImage = async (payload) => {
    try {
        const res = await axios.post(`/apis/images`, payload)
        return res.data
    }
    catch(e) {
        const errorMessage = getErrorMessage(e)
        throw errorMessage
    }
}
