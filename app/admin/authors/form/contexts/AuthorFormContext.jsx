"use client"

import { createContext, useContext, useState } from "react";
import { createNewAuthor, deleteAuthor, updateAuthor } from "../../../../../lib/firebase/author/write";
import { getAuthors } from "../../../../../lib/firebase/author/read";
import { useRouter } from "next/navigation";


const AuthorFormContext = createContext();

export default function AuthorFormContextProvider({ children }) {

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
            await createNewAuthor({ data: data });
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
            await updateAuthor({ data: data });
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
            await deleteAuthor(id);
            setIsDone(true)
            router.push('/admin/authors');
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
            const res = await getAuthors(id);
            if (res.exists()) {
                setData(res.data());
            } else {
                throw new Error(`No Category found from id ${id}`)
            }
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    return <AuthorFormContext.Provider
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
    </AuthorFormContext.Provider>
}

export const useAuthorForm = () => useContext(AuthorFormContext);
