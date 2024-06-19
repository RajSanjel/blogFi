// pages/blog/page.tsx
import { useParams } from "react-router-dom";

export default function Blog() {
    const { slug } = useParams();

    console.log(slug)
    return (
        <>

            {slug == "123" ? <section>
                <h1>purrfect</h1>
                <p> you got it!</p>
            </section> :
                <h1 className="text-4xl container text-center">No blog found</h1>
            }

        </>
    );
}