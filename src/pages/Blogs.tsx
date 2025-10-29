import Blog from "@/components/Blog";
import { useBlogs } from '../context/blogContext';
import { useEffect, useState } from "react";

type BlogsProp = {
    author: string,
    url: string,
    title: string,
    content: string,
    postedOn: string,
}[]

const Skeleton = () => {
    return (
        <div>
            <article className="h-full">
                <div className="h-full rounded-xl border border-neutral-200 bg-white p-4 shadow-sm animate-pulse">
                    <div className="flex h-full flex-col gap-3">

                        <header>
                            <div className="h-6 w-2/3 bg-neutral-200 rounded mb-2"></div>
                            <div className="h-4 w-40 bg-neutral-200 rounded"></div>
                        </header>

                        <div className="mt-1 space-y-2">
                            <div className="h-4 w-full bg-neutral-200 rounded"></div>
                            <div className="h-4 w-5/6 bg-neutral-200 rounded"></div>
                            <div className="h-4 w-4/6 bg-neutral-200 rounded"></div>
                            <div className="h-4 w-3/5 bg-neutral-200 rounded"></div>
                        </div>

                        <div className="mt-auto pt-4">
                            <div className="h-4 w-24 bg-neutral-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}
const Blogs = () => {
    const [blogs, setBlogs] = useState<BlogsProp | null>(null)
    const [loading, setLoading] = useState(true)
    const { getBlogs } = useBlogs();
    const fetch = async () => {
        const res = await getBlogs();
        if (res !== undefined) {
            setLoading(false)
            setBlogs(res);
        }
    }
    useEffect(() => {
        fetch();

        document.title = "BlogFi | Blogs";
    }, [])
    return (
        <div className="container grid gap-8 mb-10 grid-flow-row auto-rows-fr md:grid-cols-2">
            {loading ?
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
                :
                !blogs ?
                    <div>
                        No Blogs Found
                    </div> :
                    blogs.map((blog) =>
                        (<Blog {...blog} key={blog.url} />)
                    )
            }

        </div>
    );
}
export default Blogs;
