import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// import ImageTool from '@editorjs/image';
import List from "@editorjs/list";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import API_CONFIG from "../api/config";
import { useAuth } from "../context/authContext";
import edjsHTML from "editorjs-html";
import slug from "slug";
import z from "zod";
import { useNavigate } from "react-router-dom";
import AutoGrowTextarea from "@/components/AutoGrowTextArea";

const TITLE_MAX = 60;
const TITLE_MIN = 20;
const BLOG_MIN = 200;
const BLOG_MAX = 3500;

const titleSchema = z
    .string()
    .max(TITLE_MAX, { message: "Blog title is limited to 60 characters." })
    .min(TITLE_MIN, { message: "Blog title must be atleast 20 characters." });

const contentSchema = z
    .string()
    .min(BLOG_MIN, { message: "Blog too short." })
    .max(BLOG_MAX, { message: "Character limit exceeded." });


const blogSchema = z.object({
    url: z.string(),
    title: titleSchema,
    content: contentSchema,
});

const CreateBlog = () => {
    document.title = "BlogFi - New Blog";

    const { isAuth } = useAuth();
    const navigate = useNavigate();

    const editorJsParser = edjsHTML();
    const editorRef = useRef<EditorJS | null>(null);

    const [blogBody, setBlogBody] = useState("");
    const [title, setTitle] = useState("");

    const [titleError, setTitleError] = useState<string | undefined>(undefined);
    const [contentError, setContentError] = useState<string | undefined>(undefined);

    const [isTitleTouched, setIsTitleTouched] = useState(false);
    const [isBodyTouched, setIsBodyTouched] = useState(false);

    const isDraftValid =
        titleSchema.safeParse(title).success &&
        contentSchema.safeParse(blogBody).success;

    const initEditor = () => {
        const editor = new EditorJS({
            holder: "blogBody",
            placeholder: "Write your story",
            tools: {
                header: Header,
                list: List,
                // image: {
                //   class: ImageTool,
                //   config: {
                //     uploader: {
                //       async uploadByFile(file: any) {
                //         const formData = new FormData();
                //         formData.append("file", file);
                //         const response = await axios.post(`${API_CONFIG.uploadMeida}`, formData, {
                //           headers: { "Content-Type": "multipart/form-data" },
                //         });
                //         return { success: 1, file: { url: response.data.img_url } };
                //       },
                //       async uploadByUrl(url: string) {
                //         const response = await axios.post(`${API_CONFIG.uploadMeida}`, { img_url: url });
                //         return { success: 1, file: { url: response.data.img_url } };
                //       },
                //     },
                //   },
                // },
            },
            inlineToolbar: true,
            minHeight: 20,
            onReady: () => {
                editorRef.current = editor;
            },
            onChange: async () => {
                const content = await editor.saver.save();
                const parsed = editorJsParser.parse(content);
                setBlogBody(parsed.join("\n"));
                if (!isBodyTouched) setIsBodyTouched(true);
            },
        });
    };

    useLayoutEffect(() => {
        if (!editorRef.current) initEditor();
        return () => {
            editorRef.current?.destroy();
            editorRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (isTitleTouched) {
            const t = titleSchema.safeParse(title);
            setTitleError(t.success ? undefined : t.error.format()._errors[0]);
        }

        if (isBodyTouched) {
            const c = contentSchema.safeParse(blogBody);
            setContentError(c.success ? undefined : c.error.format()._errors[0]);
        }
    }, [title, blogBody, isBodyTouched, isTitleTouched]);

    const handlePost = async () => {
        if (!isAuth) return;

        const url = `${slug(title)}-${crypto.randomUUID()}`;
        const payload = { url, title, content: blogBody };

        const parsed = blogSchema.safeParse(payload);
        if (!parsed.success) return;

        try {
            const res = await axios.post(API_CONFIG.postBlog, payload, { withCredentials: true });
            if (res.status !== 200) {
                alert("Something went wrong!");
                return;
            }
            // navigate using the exact route pattern your cards use
            // if cards use to={`blog/${url}`}, then detail route is `/blogs/blog/:slug`
            navigate(`/blogs/blog/${url}`, { replace: true });

            // optional cleanup after navigation
            setTitle("");
            setBlogBody("");
            editorRef.current?.clear();
        } catch (e: any) {
            console.error(e?.message || e);
        }
    };

    if (!isAuth) {
        return <h1 className="text-center text-2xl">You must be logged in to write a blog.</h1>;
    }

    return (
        <div className="mb-8">
            <div className="container lg:w-2/3 w-4/5 border rounded-md border-slate-200 p-4 md:p-8 shadow-inner">
                <div>
                    <AutoGrowTextarea value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" maxLength={TITLE_MAX} onBlur={() => setIsTitleTouched(true)} />
                    {!!titleError && <span className="text-xs">{titleError}</span>}
                    <hr />

                    <div id="blogBody" className="py-6 min-h-[24rem]"></div>

                    {!!contentError && <span className="text-xs">{contentError}</span>}
                </div>

                <button
                    className="p-2 rounded-lg text-white bg-slate-950 w-full my-3 disabled:bg-gray-600"
                    onClick={handlePost}
                    disabled={!isDraftValid}
                >
                    Publish
                </button>
            </div>
        </div>
    );
};

export default CreateBlog;
