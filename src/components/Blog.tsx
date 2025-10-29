import { formatDate } from "@/utils/formatDate";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";

type BlogProps = {
    title: string;
    author: string;
    content: string;
    url: string;
    postedOn: string;
};

function htmlToPreview(html: string, maxLen = 220): string {
    const txt = html
        .replace(/<li[^>]*>/gi, " • ")
        .replace(/<\/li>/gi, " ")
        .replace(/<ul[^>]*>/gi, " ")
        .replace(/<\/ul>/gi, " ")
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<p[^>]*>/gi, " ")
        .replace(/<\/p>/gi, " ")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (txt.length <= maxLen) return txt;
    return txt.slice(0, maxLen).trimEnd() + "…";
}

const Blog = ({ title, author, content, url, postedOn }: BlogProps) => {
    const preview = useMemo(() => htmlToPreview(content), [content]);

    return (
        <article className="h-full">
            <Link
                to={`blog/${url}`}
                className="group block h-full rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                aria-label={title}
            >
                <div className="flex h-full flex-col gap-3">
                    <header>
                        <h2 className="text-xl font-semibold tracking-tight text-neutral-900 transition group-hover:text-neutral-700">
                            {title}
                        </h2>
                        <p className="mt-1 text-sm text-neutral-500">
                            By {author} · {formatDate(postedOn)}
                        </p>
                    </header>

                    <p className="mt-1 text-neutral-700 line-clamp-4">
                        {preview}
                    </p>

                    <div className="mt-auto">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 underline-offset-4 group-hover:underline">
                            Read more
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default Blog;
