import { useBlogs } from "@/context/blogContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Blog() {

    const [blog, setBlog] = useState<any>(null);
    const { slug } = useParams();
    const { getBlog } = useBlogs();

    const fetchBlog = async () => {
        const res = await getBlog(slug || "");
        if (res !== undefined) {
            setBlog(res);
        }
    };

    useEffect(() => {
        fetchBlog();
        document.title = blog.title;
    }, [slug]);
    return (
        <div >
            {!!blog ? (
                <section className="container md:w-2/3 w-4/5 pb-3 break-words">
                    <h1 className="text-4xl font-semibold text-justify">{blog.title}</h1>
                    <hr className="my-4" />
                    <div className="text-justify blog mb-8 grid gap-3" dangerouslySetInnerHTML={{ __html: blog.content }} ></div>
                </section>
            ) : (
                <h1 className="text-4xl container text-center">No blog found</h1>
            )}
        </div>
    );
}
