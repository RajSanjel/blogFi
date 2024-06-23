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
                <div>
                    Loading blogs....
                </div> :
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
