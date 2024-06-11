import Blog from "@/components/Blog";
import blogDatas from "../api/blogs.json"


const Blogs = () => {
    return (
        <div className="container grid gap-8 mb-10">
            {blogDatas.map((data, idx) =>
                (<Blog {...data} key={idx} />)
            )}
        </div>
    );
}

export default Blogs;
