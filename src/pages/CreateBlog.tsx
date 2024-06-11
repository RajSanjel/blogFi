import "./CreateBlog/index.css"
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import { useEffect, useRef } from 'react';


const CreateBlog = () => {
    const createBlogRef = useRef<any>(null);
    // const [content, setContent] = useState("")

    const initEditor = () => {
        const editor = new EditorJS({
            holder: "blogContent",
            placeholder: "Write your story",
            tools: {
                header: Header,
                list: List,
                image: {
                    class: ImageTool

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
        <div className="container w-2/3">

            <input type="text" className="w-full text-4xl p-4 focus:outline-none" name="blogtitle" id="blogtitle" placeholder="Title" />
            {/* <textarea className="w-full min-h-min text-xl p-4 focus:outline-none" name="blogContent" id="blogContent" placeholder="Tell your story..." /> */}

            <div id="blogContent"></div>
        </div>
    );
}

export default CreateBlog;
