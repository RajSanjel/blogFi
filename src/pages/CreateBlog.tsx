import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
// import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import API_CONFIG from "../api/config";
import { useAuth } from "../context/authContext";
import edjsHTML from "editorjs-html";
import slug from "slug";
import z from "zod"
import { Navigate } from "react-router-dom";


const CreateBlog = () => {
    document.title = "BlogFi - New Blog"
    const { isAuth } = useAuth();
    const editorJsParser = edjsHTML();
    const editorInstanceRef = useRef<EditorJS | null>(null);
    const [blogBody, setBlogBody] = useState("");
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState<string | undefined>(undefined);
    const [contentError, setContentError] = useState<string | undefined>(undefined);
    const [navigate, setNavigate] = useState(false)

    const blogSchema = z.object({
        url: z.string(),
        title: z.string().max(60, { message: "Blog title is limited to 70 characters." }).and(z.string().min(20, { message: "Blog title must be atleast 20 characters." })),
        content: z.string().min(200, { message: "Blog too short." })
    })
    const submitBlog = {
        url: `${slug(title)}-${crypto.randomUUID()}`,
        title,
        content: blogBody
    };

    const initEditor = () => {
        const editor = new EditorJS({
            holder: "blogContent",
            placeholder: "Write your story",
            tools: {
                header: Header,
                list: List,
                // image: {
                //     class: ImageTool,
                //     config: {
                //         uploader: {
                //             async uploadByFile(file: any) {
                //                 const formData = new FormData();
                //                 formData.append("file", file);
                //                 const response = await axios.post(`${API_CONFIG.uploadMeida}`, formData, {
                //                     headers: {
                //                         "Content-Type": "multipart/form-data"
                //                     }
                //                 });
                //                 return {
                //                     success: 1,
                //                     file: {
                //                         url: response.data.img_url
                //                     }
                //                 };
                //             },
                //             async uploadByUrl(url: string) {
                //                 const response = await axios.post(`${API_CONFIG.uploadMeida}`, {
                //                     img_url: url
                //                 });
                //                 return {
                //                     success: 1,
                //                     file: {
                //                         url: response.data.img_url
                //                     }
                //                 };
                //             }
                //         }
                //     }
                // }
            },
            inlineToolbar: true,
            minHeight: 20,
            onReady: () => {
                editorInstanceRef.current = editor;
            },
            onChange: async () => {
                const content = await editor.saver.save();
                const parsedContent = editorJsParser.parse(content);
                setBlogBody(parsedContent.join("\n"));
            },

        });
    };
    useEffect(() => {
        if (!editorInstanceRef.current) {
            initEditor();
        }
        return () => {
            editorInstanceRef.current?.destroy();
            editorInstanceRef.current = null;
        };
    }, []);
    const isValidBlog = blogSchema.safeParse(submitBlog)
    useEffect(() => {
        const errors = isValidBlog?.error?.format()
        if (!errors) {
            setTitleError(undefined);
            setContentError(undefined);
            return;
        }
        setTitleError(errors?.title?._errors[0])
        setContentError(errors?.content?._errors[0])

    }, [title, blogBody])
    const handlePost = async () => {
        const isValidBlog = blogSchema.safeParse(submitBlog)
        if (!isAuth) return;
        if (!isValidBlog.success) return;
        try {
            const res = await axios.post(API_CONFIG.postBlog, submitBlog, { withCredentials: true });
            if (!(res.status === 200)) {
                return alert("Something went wrong!")
            }
            setTitle("");
            setBlogBody("");
            editorInstanceRef.current?.clear();
            setNavigate(true);
        } catch (error) {
            console.log((error as Error).message)
        }
    };
    if (navigate) {
        console.log("yes");
        return < Navigate to={`/blogs/blog/${submitBlog.url}`} />
    }
    return (
        <div className="mb-8">
            {isAuth ? (
                <div className="container lg:w-2/3 w-4/5 border rounded-md border-slate-200 p-4 md:p-8 shadow-inner">
                    <div>
                        <textarea
                            className="text-3xl focus:outline-none overflow-hidden resize-none w-full"
                            name="blogtitle"
                            id="blogtitle"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={65}
                        />
                        {!!titleError &&
                            <span className="text-xs">{titleError}</span>
                        }
                        <hr />
                        <div id="blogContent" className="py-6 min-h-96 blog">

                        </div>
                        {!!titleError &&
                            <span className="text-xs">{contentError}</span>
                        }
                        <hr />
                    </div>
                    <button className="p-2 rounded-lg text-white bg-slate-950 w-full my-3 disabled:bg-gray-600" onClick={handlePost}
                        disabled={!isValidBlog.success}
                    >
                        Publish
                    </button>
                </div>
            ) : (
                <h1 className="text-center text-2xl">You must be logged in to write a blog.</h1>
            )}
        </div>
    );
};

export default CreateBlog;
