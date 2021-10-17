import { useState } from "react";

import { useContext, createContext, useEffect } from "react";
import {userLogin, getMe, userSignup} from './apis'
import {setCookie, getCookie} from './cookieHandler'

export const authContext = createContext();

export function useAuth() {
    return useContext(authContext);
}

const fakeAuth = {
    signin: async function(username, password) {
        return userLogin(username, password)
    },
    signup: async function(username, password) {
        return userSignup(username, password)
    },
    getUser: async function() {
        const res = await getMe()
        return res
    },
    signout() {
    }
  };

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = async (username, password) => {
        try {
            const userItem = await fakeAuth.signin(username, password)
            setUser(userItem)
            setCookie('u', userItem.token)
        }
        catch(e) {
            console.error('[useProvideAuth.signin]: ', e)
            throw e
        }
    };
    const signup = async (username, password) => {
        try {
            await fakeAuth.signup(username, password)
        }
        catch(e) {
            console.error('[useProvideAuth.signin]: ', e)
            throw e
        }
    };

    const loginWithCookie = async () => {
        try {
            const userItem = await fakeAuth.getUser()

            if(!user) {
                setUser(userItem)
                return true
            }

            return userItem.id === user.id
        }
        catch(e) {
            return false
        }
    }

    const signout = async (username, password) => {
        try {
            await fakeAuth.signout()
            setUser(null)
            console.log('[signout] clean cookie')
            setCookie('u', '')
        }
        catch(e) {
            console.error('[useProvideAuth.signin]: ', e)
            throw e
        }
    };

    useEffect(async () => {
        const cookie = getCookie('u')
        if(!cookie) return

        const isLogin = await loginWithCookie()

        if(isLogin) return 

        return signout()
    }, []);

    return {
        user,
        signin,
        signout,
        signup
    };
}


