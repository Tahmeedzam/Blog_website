import { getPost } from "../../../lib/firebase/post/read_server";
import { getAuthor } from "../../../lib/firebase/author/read_server";
import { getCategory } from "../../../lib/firebase/category/read_server";

export async function generateMetadata({ params }, parent) {
    // read route params
    const postId = await params.postId;
    if (!postId) return { title: "Post Not Found" };


    const post = await getPost(postId);

    // fetch data
    let product = null;
    try {

        const product = await fetch(`https://.../${postId}`).then((res) => res.json());
    } catch (error) {
        console.log("Fetch error:", error);
    }

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: post?.title,
        openGraph: {
            images: ['/some-specific-page-image.jpg', ...previousImages],
        },
    }
}

export default async function Page({ params }) {
    // Fetch postId safely
    const postId = await params.postId;
    if (!postId) return <h3>Error: Post ID not found</h3>;
    if (!postId || typeof postId !== "string") {
        return <h3>Error: Invalid Post ID</h3>;
    }
    const post = await getPost(postId);
    if (!post) return <h3>Error: Post not found</h3>;

    return (
        <main className="flex justify-center">
            <section className="flex flex-col gap-5 px-16 py-10 max-w-[800px]">
                <CategoryCard categoryId={post?.categoryId} />
                <h1 className="text-2xl font-bold">{post?.title}</h1>
                {/* ✅ Render image properly */}
                <img
                    className="w-full object-cover"
                    src={post?.imageURL || "/blog.jpeg"}
                    alt="Blog Image"
                />
                <div className="flex justify-between items-center">
                    <AuthorCard authorId={post?.authorId} />
                    <h5 className="text-xs text-gray-500">
                        {post?.timestamp?.toDate()?.toLocaleDateString()}
                    </h5>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
            </section>
        </main>
    );
}

async function AuthorCard({ authorId }) {
    const author = await getAuthor(authorId);
    return (
        <div className="flex gap-2 items-center">
            <img className="h-6 w-6 rounded-full object-cover" src="/profile.jpg" alt="Author" />
            <h4 className="text-sm text-gray-500">{author?.name}</h4>
        </div>
    );
}

async function CategoryCard({ categoryId }) {
    const category = await getCategory(categoryId);
    return (
        <div className="flex">
            <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-2 py-1 border">
                <h4 className="text-xs text-gray-500">{category?.name}</h4>
            </div>
        </div>
    );
}
