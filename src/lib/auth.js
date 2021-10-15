import { useState } from "react";

import { useContext, createContext, useEffect } from "react";
import {userLogin, getMe} from './apis'

export const authContext = createContext();

export function useAuth() {
    return useContext(authContext);
}

function setCookie(cname, cvalue, exdays = 1) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

const fakeAuth = {
    signin: async function(username, password) {
        const res = await userLogin(username, password)
        return res
    },
    getUser: async function(token) {
        const res = await getMe(token)
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

    const loginWithCookie = async () => {
        try {
            const token = getCookie('u')
            console.log('token: ', token)
            const userItem = await fakeAuth.getUser(token)

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
            const userItem = await fakeAuth.signout()
            setUser(null)
            setCookie('u', '')
        }
        catch(e) {
            console.error('[useProvideAuth.signin]: ', e)
            throw e
        }
    };

    useEffect(async () => {
        const isLogin = await loginWithCookie()

        if(isLogin) return 

        return signout()
    });

    return {
        user,
        signin,
        signout
    };
}


