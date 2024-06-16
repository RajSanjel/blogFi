
type BlogProps = {
    title: string,
    author: string,
    username: string,
    image_url: string,
    content: string
}

const Blog = ({ title, author, content }: BlogProps) => {
    return (
        <div className="bg-white grid border-2 p-1 md:p-3 rounded-sm grid-flow-col gap-3 items-center">
            <div className="rounded-sm overflow-hidden max-w-32">
                <img src={"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="asa" className="md:aspect-[4/3] md:w-52 w-full " />
            </div>
            <div className="grid gap-1">
                <h1 className="md:hidden font-semibold">
                    {title.split(" ").slice(0, 5).join(" ")}...
                </h1>
                <h1 className="hidden md:block text-lg md:text-2xl font-semibold">
                    {title}
                </h1>
                <p className="text-justify hidden md:block">
                    {content.split(" ").slice(0, 30).join(" ")}...
                </p>
                <span className="text-xs">
                    By {author}
                </span>
            </div>
        </div>
    );
}

export default Blog;
