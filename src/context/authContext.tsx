import API_CONFIG from "@/api/config";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


type loginDataProps = {
    emailOrUsername: string;
    password: string;
}

type signupDataProps = {
    email: string,
    username: string,
    name: string,
    password: string,
}
type UserProp = {
    name: string,
    email: string,
    username: string,
    userid: string
}

type AuthContextProps = {
    isAuth: boolean,
    logout: () => void,
    login: (loginData: loginDataProps) => Promise<{ status: number }>,
    signup: (signupData: signupDataProps) => Promise<{ status: number, data?: any }>
    user: UserProp
}
const AuthContext = createContext({} as AuthContextProps);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("useSomething must be used within a SomethingProvider");
    return context;
}

export function AuthProvider({ children }: any) {
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState<UserProp>({ name: "", email: "", username: "", userid: "" })
    const confirmAuth = async () => {
        try {
            await axios.post(API_CONFIG.verify, {}, { withCredentials: true }).then(res => {
                if (res.status === 200) {
                    return setIsAuth(true)
                } else {
                    return setIsAuth(false);
                }
            })
        } catch (error) {
            console.log((error as Error).message)
            setIsAuth(false)
        }
    }
    useEffect(() => {
        confirmAuth()
    }, [confirmAuth])

    const logout = async () => {
        await axios.post(API_CONFIG.logout, {}, { withCredentials: true })
        setIsAuth(false);
        return confirmAuth()
    }

    const login = async (loginData: loginDataProps) => {
        const res = await axios.post(API_CONFIG.login, loginData, { withCredentials: true })
        try {
            console.log(res)
            if (res.status === 200) {
                setIsAuth(true);
                return { status: res.status }
            } else {
                setIsAuth(false);
                return { status: res.status }
            }
        } catch (error) {
            setIsAuth(false);
            return { status: (error as any).response?.status || 500 };
        }
    }

    const signup = async (signupData: signupDataProps) => {
        const res = await axios.post(API_CONFIG.signup, signupData, { withCredentials: true })
        try {
            if (res.status === 200) {
                setIsAuth(true);
                return { status: res.status, data: res.data }
            } else {
                setIsAuth(false);
                return { status: res.status, data: res.data }
            }
        } catch (error) {
            setIsAuth(false);
            return { status: (error as any).response?.status || 500 };
        }
    }

    const getUser = async () => {
        const res = await axios.get(API_CONFIG.getUser, { withCredentials: true })
        const data = res.data.msg.user
        try {
            if (res.status === 200) {
                setUser({
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    userid: data.userid
                })
            }
        } catch (error) {
            return { status: (error as any).response?.status || 500 };
        }
    }
    useEffect(() => {
        if (isAuth) {
            getUser();
        }
    }, [isAuth])


    return (
        <>
            <AuthContext.Provider
                value={{ isAuth, logout, login, signup, user }}
            >
                {children}
            </AuthContext.Provider>
        </>
    )
}