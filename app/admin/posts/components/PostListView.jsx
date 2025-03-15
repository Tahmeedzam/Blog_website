"use client"

import Link from "next/link"
import { usePosts } from "../../../../lib/firebase/post/read";


export default function PostListView() {
    const { data, error, Loading } = usePosts();

    if (Loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    if (!data) {
        return <h1>Data not found</h1>
    }

    return <section>
        <table className="w-full">
            <thead>
                <tr>
                    <th className="border px-4 py-2  bg-blue-50">Sr.</th>
                    <th className="border px-4 py-2  bg-blue-50">Name</th>
                    <th className="border px-4 py-2  bg-blue-50 ">Slug</th>
                    <th className="border px-4 py-2  bg-blue-50">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, key) => {
                    return <tr>
                        <td className="border px-4 py-2 ">{key + 1}</td>
                        <td className="border px-4 py-2 ">{item?.title || item?.name}</td>
                        <td className="border px-4 py-2 ">{item?.slug}</td>
                        <td className="border px-4 py-2 ">
                            <Link href={`/admin/posts/form?id=${item?.id}`}>
                                <button className="bg-blue-500 rounded-full text-white px-4 py-2">Action</button>
                            </Link></td>
                    </tr>
                })}
            </tbody>
        </table>
    </section>
}