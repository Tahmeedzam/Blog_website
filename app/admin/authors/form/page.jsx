"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthorForm } from "./contexts/AuthorFormContext";

function AuthorFormPage() {
    const searchParams = useSearchParams();
    const updateAuthorId = searchParams.get('id');
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
    } = useAuthorForm();

    useEffect(() => {
        if (updateAuthorId) {
            fetchData(updateAuthorId);
        }
    }, [updateAuthorId]);

    return (
        <main className="w-full p-6 flex flex-col gap-3">
            <div className="flex gap-4 items-center">
                {updateAuthorId ? (
                    <div className="flex">
                        <h3 className="bg-orange-500 text-white px-4 py-2 rounded-full text-xs">Update</h3>
                    </div>
                ) : (
                    <div className="flex">
                        <h3 className="bg-green-500 text-white px-4 py-2 rounded-full text-xs">Create</h3>
                    </div>
                )}
                <h1 className="font-bold">Author | form</h1>
            </div>
            <section className="flex">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (updateAuthorId) {
                            handleUpdate();
                        } else {
                            handleCreate();
                        }
                    }}
                    className="flex flex-col gap-2 bg-blue-50 rounded-xl p-7"
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-500">
                            Author Name: <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="px-4 py-2 rounded-full bg-gray-50"
                            type="text"
                            placeholder="Enter Author Name"
                            onChange={(e) => handleData("name", e.target.value)}
                            value={data?.name}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-500">
                            Author Email: <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="px-4 py-2 rounded-full bg-gray-50"
                            type="email"
                            placeholder="Enter Author Email"
                            onChange={(e) => handleData("email", e.target.value)}
                            value={data?.email}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {!isDone && (
                        <button
                            type="submit"
                            disabled={isLoading || isDone}
                            className="bg-blue-500 rounded-full px-4 py-2 text-white"
                        >
                            {isLoading ? "Loading..." : updateAuthorId ? "Update" : "Create"}
                        </button>
                    )}

                    {updateAuthorId && !isDone && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete(updateAuthorId);
                            }}
                            disabled={isLoading || isDone}
                            className="bg-red-500 rounded-full px-4 py-2 text-white"
                        >
                            {isLoading ? "Loading..." : "Delete"}
                        </button>
                    )}

                    {isDone && (
                        <h1 className="text-green-500 font-bold text-center">
                            Successfully {updateAuthorId ? "Updated" : "Created"}!
                        </h1>
                    )}
                </form>
            </section>
        </main>
    );
}

// Wrap the page with Suspense to handle useSearchParams
export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthorFormPage />
        </Suspense>
    );
}
