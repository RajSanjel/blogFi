import "./CreateBlog/index.css"
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import { useEffect, useRef } from 'react';
import axios from "axios";
import API_CONFIG from "../config";

const CreateBlog = () => {
    const createBlogRef = useRef<any>(null);
    const initEditor = () => {
        const editor = new EditorJS({
            holder: "blogContent",
            placeholder: "Write your story",
            tools: {
                header: Header,
                list: List,
                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                            async uploadByFile(file: object) {
                                const a = await axios.post(`${API_CONFIG.uploadMeida}`, {
                                    file: file
                                }, {
                                    headers: {
                                        "Content-Type": "multipart/form-data"
                                    }
                                },
                                )
                                return {
                                    success: 1,
                                    file: {
                                        url: a.data.img_url
                                    }
                                };
                            },
                            async uploadByUrl(file: object) {
                                console.log(file)
                                const a = await axios.post(`${API_CONFIG.uploadMeida}`, {
                                    img_url: file
                                },
                                )

                                return {
                                    success: 1,
                                    file: {
                                        url: a.data.img_url
                                    }
                                };
                            },
                        }
                    }
                }
            },
            inlineToolbar: true,
            onReady: () => {
                createBlogRef.current = editor

            },
            onChange: async () => {
                let content = await editor.saver.save()
                console.log(content)
            }

        }
        );
    }
    useEffect(() => {
        if (!createBlogRef.current) {
            initEditor()
        }
        return () => {
            createBlogRef?.current?.destroy();
            createBlogRef.current = null;
        }
    }, [])

    return (
        <div className="container lg:w-2/3 shadow-2xl">
            <textarea className="w-full min-h-fit h-20 text-4xl p-4 focus:outline-none overflow-hidden resize-none " name="blogtitle" id="blogtitle" placeholder="Title" />
            <div id="blogContent"></div>
        </div>
    );
}

export default CreateBlog;
