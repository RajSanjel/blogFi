import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type BlogProps = {
    title: string,
    author: string,
    content: string,
    url: string,
    postedOn: string,
}

const Blog = ({ title, author, content, url, postedOn }: BlogProps) => {
    const date = new Date(postedOn);
    const formattedDate = date.toISOString().split("T")[0]
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (contentRef.current != null)
            contentRef.current.innerHTML = `${content.split(" ").slice(0, 30).join(" ")}...`;

    }, [])

    return (
        <div className="bg-white grid border-2 p-1 md:p-3 rounded-sm grid-flow-col gap-3 items-center max-h-48  break-words overflow-hidden">
            <div className="grid gap-1 ">
                <Link to={`blog/${url}`} className="underline">
                    <h1 className="text-lg md:text-2xl font-semibold">
                        {title}
                    </h1>
                </Link>
                <div className="text-justify md:block" ref={contentRef}>

                </div>
                <span className="text-xs break-words">
                    By {author}<br />
                    On {formattedDate}
                </span>
            </div>
        </div>
    );
}

export default Blog;
