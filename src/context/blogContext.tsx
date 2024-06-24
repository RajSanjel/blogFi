import API_CONFIG from "@/api/config";
import axios, { AxiosResponse } from "axios";
import { createContext, useContext } from "react";

type BlogsProp = {
    author: string,
    url: string,
    title: string,
    content: string,
    postedOn: string,
}

type BlogContext = {
    getBlogs: () => Promise<BlogsProp[]>;
    getBlog: (url: string) => Promise<BlogsProp>;
    deleteBlog: (blogid: string) => Promise<boolean>;
}

const BlogContext = createContext({} as BlogContext)

export function useBlogs() {
    const context = useContext(BlogContext);
    if (context === undefined)
        throw new Error("useSomething must be used within a SomethingProvider");
    return context;
}

export function BlogProvider({ children }: any) {

    async function getBlogs() {
        try {
            const res = await axios.get(API_CONFIG.getBlogs)
            if (res.status === 200) {
                return res.data.message;
            }
        } catch (error) {
            console.log((error as Error).message)
            return;
        }
    }

    async function getBlog(url: string) {
        try {
            const res = await axios.get(API_CONFIG.getBlog + "/" + url)

            if (res.status === 200) {
                return res.data.message;
            }
        } catch (error) {
            console.log((error as Error).message)
            return;
        }
    }

    const deleteBlog = async (blogid: string) => {
        try {
            const res: AxiosResponse<any, any> = await axios.post(API_CONFIG.deleteBlog, { blogid }, { withCredentials: true });
            if (res.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log((error as Error).message)
            return false;

        }
    }


    return (<BlogContext.Provider value={{ getBlogs, getBlog, deleteBlog }}>
        {children}
    </BlogContext.Provider >
    )
}
