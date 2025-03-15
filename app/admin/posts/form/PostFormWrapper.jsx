"use client";

import { useSearchParams } from "next/navigation";
import PostForm from "./PostForm";

export default function PostFormWrapper() {
    const searchParams = useSearchParams();
    const updatePostId = searchParams.get("id");

    return <PostForm updatePostId={updatePostId} />;
}
