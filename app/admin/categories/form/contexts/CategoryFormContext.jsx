"use client"

import { createContext, useContext, useState } from "react";

const CategoryFormContext = createContext();

export default function CategoryFormContextProvider({ children }) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const [image, setImage] = useState(null);

    const handleData = (key, value) => {
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
            //Todo: Add data to firebase
            //Todo: Add image to storage
            setIsDone(true)
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    return <CategoryFormContext.Provider
        value={{
            data,
            isLoading,
            error,
            isDone,
            handleData,
            handleCreate,
            image,
            setImage,
        }}
    >
        {children}
    </CategoryFormContext.Provider>
}

export const useCategoryForm = () => useContext(CategoryFormContext);