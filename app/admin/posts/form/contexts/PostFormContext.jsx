"use client"

import { createContext, useContext, useState } from "react";
import { createNewPost, deletePost, updatePost } from "../../../../../lib/firebase/post/write";
import { useRouter } from "next/navigation";
import { getPost } from "../../../../../lib/firebase/post/read";


const PostFormContext = createContext();

export default function PostFormContextProvider({ children }) {

    const router = useRouter();


    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDone, setIsDone] = useState(false);

    const handleData = (key, value) => {
        setIsDone(false)
        setData({
            ...data,
            [key]: value,
        })
    }

    const handleCreate = async () => {
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try {
            await createNewPost({ data: data });
            setIsDone(true)
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    const handleUpdate = async () => {
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try {
            await updatePost({ data: data });
            setIsDone(true)
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    const handleDelete = async (id) => {
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try {
            await deletePost(id);
            setIsDone(true)
            router.push('/admin/posts');
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    const fetchData = async (id) => {
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try {
            const res = await getPost(id);
            if (res.exists()) {
                setData(res.data());
            } else {
                throw new Error(`No Post found from id ${id}`)
            }
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    return <PostFormContext.Provider
        value={{
            data,
            isLoading,
            error,
            isDone,
            handleData,
            handleCreate,
            handleUpdate,
            handleDelete,
            fetchData,
        }}
    >
        {children}
    </PostFormContext.Provider>
}

export const usePostForm = () => useContext(PostFormContext);
