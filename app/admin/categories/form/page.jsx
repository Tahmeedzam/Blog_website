"use client"

import { useEffect } from "react";
import { useCategoryForm } from "./contexts/CategoryFormContext";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const updateCategoryId = searchParams.get('id');
    const {
        data,
        isLoading,
        error,
        isDone,
        handleData,
        handleCreate,
        handleUpdate,
        handleDelete,
        fetchData,
    } = useCategoryForm();

    useEffect(() => {
        if (updateCategoryId) {
            fetchData(updateCategoryId);
        }
    }, [updateCategoryId])

    return <main className="w-full p-6 flex flex-col gap-3">
        <div className="flex gap-4 items-center">

            {updateCategoryId && <div className="flex ">
                <h3 className="bg-orange-500 text-white px-4 py-2 rounded-full text-xs">Update</h3>
            </div>}
            {!updateCategoryId && <div className="flex ">
                <h3 className="bg-green-500 text-white px-4 py-2 rounded-full text-xs">Create</h3>
            </div>}
            <h1 className="font-bold">Category | form</h1>
        </div>
        <section className="flex">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (updateCategoryId) {
                        handleUpdate();
                    } else {
                        handleCreate();

                    }
                }}
                className="flex flex-col gap-2 bg-blue-50 rounded-xl p-7">
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Category Name: <span className="text-red-500">*</span></label>
                    <input
                        className="px-4 py-2 rounded-full bg-gray-50 "
                        type="text"
                        placeholder="Enter Category Name"
                        onChange={(e) => {
                            handleData('name', e.target.value)
                        }}
                        value={data?.name}
                        required />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Category Slug: <span className="text-red-500">*</span></label>
                    <input
                        className="px-4 py-2 rounded-full bg-gray-50 "
                        type="text"
                        placeholder="Enter Category Slug"
                        onChange={(e) => {
                            handleData('slug', e.target.value)
                        }}
                        value={data?.slug}
                        required />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}


                {!isDone && <button
                    type="submit"
                    disabled={isLoading || isDone}
                    className="bg-blue-500 rounded-full px-4 py-2 text-white">
                    {isLoading ? "Loading..." : updateCategoryId ? "Update" : "Create"}
                </button>}


                {updateCategoryId && !isDone && <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleDelete(updateCategoryId);
                    }}
                    disabled={isLoading || isDone}
                    className="bg-red-500 rounded-full px-4 py-2 text-white">
                    {isLoading ? "Loading..." : "Delete"}
                </button>}

                {isDone && <h1 className="text-green-500 font-bold text-center">
                    Successfully {updateCategoryId ? "Updated" : "Created"}!
                </h1>}

            </form>
        </section>
    </main>
}