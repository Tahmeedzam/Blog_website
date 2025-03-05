import { CirclePlus } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
    return <main className="p-6 w-full">
        <div className='flex justify-between items-center'>
            <h1>Categories</h1>
            <Link href={'/admin/categories/form'}>
                <button className="flex gap-2 items-center bg-blue-500 px-4 py-2 text-white rounded-full">
                    <CirclePlus />
                    Add
                </button>
            </Link>
        </div>
    </main>
}