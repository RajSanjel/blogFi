import API_CONFIG from "@/api/config";
import axios from "axios";
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

    return (<BlogContext.Provider value={{ getBlogs, getBlog }}>
        {children}
    </BlogContext.Provider >
    )
}