import NotFound from "@/components/NotFound";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/context/authContext";
import { useBlogs } from "@/context/blogContext";
import { formatDate } from "@/utils/formatDate"
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

function Blog() {
    const [blog, setBlog] = useState<any>(null);
    const [isOriginalPoster, setIsOriginalPoster] = useState(false);
    const [loading, setLoading] = useState(true)
    const { slug } = useParams();
    const { getBlog } = useBlogs();
    const { user, isAuth } = useAuth();
    const fetchBlog = async () => {
        const res = await getBlog(slug || "");
        if (res !== undefined) {
            setBlog(res);
            setLoading(false)
        } else if (res != 200) {
            setLoading(false)
        }
    };

    const originalPoster = () => {
        if (!isAuth) return;
        if (!blog) return;
        if (blog.userid == user.userid) {
            return setIsOriginalPoster(true);
        }
        setIsOriginalPoster(false);
    }

    useEffect(() => {
        fetchBlog();
    }, [isAuth]);
    useEffect(() => {
        originalPoster()
    }, [blog]);
    return (
        <div >
            {loading ? <div className="text-center">
                <section className="container md:w-2/3 w-full break-words grid p-16 border border-neutral-50 bg-white animate-pulse">

                    <div className="h-8 w-3/4 bg-neutral-200 rounded mb-4"></div>

                    <div className="grid grid-flow-row gap-2">
                        <div className="h-4 w-24 bg-neutral-200 rounded"></div>
                        <div className="h-4 w-16 bg-neutral-200 rounded"></div>
                    </div>

                    <hr className="my-4" />

                    <div className="grid gap-3">
                        <div className="h-4 w-full bg-neutral-200 rounded"></div>
                        <div className="h-4 w-5/6 bg-neutral-200 rounded"></div>
                        <div className="h-4 w-3/4 bg-neutral-200 rounded"></div>
                        <div className="h-4 w-1/2 bg-neutral-200 rounded"></div>
                        <div className="h-40 w-full bg-neutral-200 rounded"></div>
                    </div>

                </section>
            </div> :
                !!blog ? (
                    <section className="container md:w-2/3 w-full break-words grid p-16 border border-neutral-50 bg-white">
                        <h1 className="text-4xl font-semibold text-justify">{blog.title}
                        </h1>
                        <div className="text-[1rem] m-0 p-0 grid grid-flow-col justify-between">
                            <span>
                                By {blog.author}<br /> On {formatDate(blog.postedOn)}
                            </span>
                            {
                                isOriginalPoster &&
                                <span className="grid  grid-flow-col gap-3 hover:cursor-pointer items-center justify-start">
                                    <Delete {...blog} />
                                </span>
                            }
                        </div>
                        <hr className="my-4" />
                        <div className="text-justify blog mb-8 grid gap-3" dangerouslySetInnerHTML={{ __html: blog.content }} ></div>
                    </section>
                ) : (
                    <NotFound />
                )
            }
        </div>
    );
}

export function Delete({ blogid }: { blogid: string }) {
    const { deleteBlog } = useBlogs();
    const [deleted, setDeleted] = useState(false)
    const handleClick = async (id: string) => {
        const res = await deleteBlog(id)
        setDeleted(res)
    }
    if (deleted) {
        return <Navigate to="/blogs" />
    }
    return (
        <Dialog>
            <DialogTrigger>
                <Trash2 size={18} color="red" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Delete Blog</DialogTitle>
                    <DialogDescription className="text-lg text-salte-950">
                        Are you sure you want to delete the blog?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" className="bg-red-600 hover:bg-red-500" onClick={() => handleClick(blogid)}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default Blog;
