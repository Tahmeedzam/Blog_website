"use client"

import { useEffect, useRef, useState } from "react";
import { usePostForm } from "./contexts/PostFormContext";
import { useSearchParams } from "next/navigation";
import { useCategories } from "../../../../lib/firebase/category/read";
import JoditEditor from "jodit-react";
import { RTEField } from "../form/components/RTEField"
import { Lock } from "lucide-react";

export default function Page() {
    const searchParams = useSearchParams();
    const updatePostId = searchParams.get('id');
    const editor = useRef(null);
    const [content, setContent] = useState('');
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
    } = usePostForm();

    useEffect(() => {
        if (updatePostId) {
            fetchData(updatePostId);
        }
    }, [updatePostId])

    return <main className="w-full p-6 flex flex-col gap-3">
        <div className="flex gap-4 items-center">

            {updatePostId && <div className="flex ">
                <h3 className="bg-orange-500 text-white px-4 py-2 rounded-full text-xs">Update</h3>
            </div>}
            {!updatePostId && <div className="flex ">
                <h3 className="bg-green-500 text-white px-4 py-2 rounded-full text-xs">Create</h3>
            </div>}
            <h1 className="font-bold">Post | form</h1>
        </div>
        <section className="flex">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (updatePostId) {
                        handleUpdate();
                    } else {
                        handleCreate();

                    }
                }}
                className="flex flex-col gap-2 bg-blue-50 rounded-xl p-7">
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Post Title: <span className="text-red-500">*</span></label>
                    <input
                        className="px-4 py-2 rounded-full bg-gray-50 "
                        type="text"
                        placeholder="Enter Title"
                        onChange={(e) => {
                            handleData('title', e.target.value)
                        }}
                        value={data?.title}
                        required />
                </div>

                {updatePostId &&

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-500">Post Slug: <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-full bg-gray-200 "
                            type="text"
                            placeholder="Enter Post Slug"
                            disabled={updatePostId}
                            onChange={(e) => {
                                handleData('slug', e.target.value)
                            }}
                            value={data?.slug}
                            required />
                    </div>

                }

                {!updatePostId && <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Post Slug: <span className="text-red-500">*</span></label>
                    <input
                        className="px-4 py-2 rounded-full bg-gray-50 "
                        type="text"
                        placeholder="Enter Post Slug"
                        disabled={updatePostId}
                        onChange={(e) => {
                            handleData('slug', e.target.value)
                        }}
                        value={data?.slug}
                        required />
                </div>}

                <SelectCategoryField />
                {error && <p className="text-red-500 text-sm">{error}</p>}


                {!isDone && <button
                    type="submit"
                    disabled={isLoading || isDone}
                    className="bg-blue-500 rounded-full px-4 py-2 text-white">
                    {isLoading ? "Loading..." : updatePostId ? "Update" : "Create"}
                </button>}


                {updatePostId && !isDone && <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleDelete(updatePostId);
                    }}
                    disabled={isLoading || isDone}
                    className="bg-red-500 rounded-full px-4 py-2 text-white">
                    {isLoading ? "Loading..." : "Delete"}
                </button>}

                {isDone && <h1 className="text-green-500 font-bold text-center">
                    Successfully {updatePostId ? "Updated" : "Created"}!
                </h1>}

            </form>
            <div className="p-4 h-100 w-300">

                <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={newContent => handleData('content', newContent)}
                />
            </div>
        </section>
    </main>
}

function SelectCategoryField() {
    const {
        data,
        handleData,
    } = usePostForm();
    const { data: categories } = useCategories();


    return <div>
        <label className="text-sm text-gray-500">Category: <span className="text-red-500">*</span></label>
        <select
            className="px-4 py-2 rounded-full bg-gray-50 w-full"
            name="category"
            id="category"
            value={data?.categoryId}
            onChange={(e) => {
                handleData('categoryId', e.target.value)
            }}
            required>
            <option value="">Select category</option>
            {categories && categories?.map((item) => {
                return <option value={item?.id}>
                    {item?.name}
                </option>
            })}
        </select>
    </div>
}