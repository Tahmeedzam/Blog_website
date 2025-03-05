"use client"

import { useCategoryForm } from "./contexts/CategoryFormContext";

export default function Page() {
    const {
        data,
        isLoading,
        error,
        isDone,
        handleData,
        handleCreate,
        image,
        setImage,
    } = useCategoryForm();
    return <main className="w-full p-6 flex flex-col gap-3">
        <h1 className="font-bold">Category | form</h1>
        <section className="flex">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreate();
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
                {image && <div>
                    <img className="h-40" src={URL.createObjectURL(image)} alt="" />
                </div>}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Category Image: <span className="text-red-500">*</span></label>
                    <input
                        className="px-4 py-2 rounded-full bg-gray-50 "
                        type="file"
                        accept="image/*"
                        placeholder="Enter Category Image"
                        onChange={(e) => {
                            e.preventDefault();
                            setImage(e.target.files[0])
                        }}
                        required />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 rounded-full px-4 py-2 text-white">Create</button>

            </form>
        </section>
    </main>
}