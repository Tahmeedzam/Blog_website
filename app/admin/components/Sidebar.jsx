import { LayoutDashboard, LayoutList, RectangleEllipsis, User } from 'lucide-react'
import Link from 'next/link'

export default function Sidebar() {
    const link = [
        {
            name: 'Posts',
            link: '/admin/posts',
            icon: <LayoutList />
        },
        {
            name: 'Categories',
            link: '/admin/categories',
            icon: <RectangleEllipsis />
        },
        {
            name: 'Authors',
            link: '/admin/authors',
            icon: <User />
        },

    ]

    return <section className='w-[200px] border-r h-screen p-6 '>
        <ul className='w-full flex flex-col gap-6'>
            {link.map((item, index) => {
                return <Link href={item.link}>
                    <li className='flex gap-3 font-medium items-center bg-blue-50 rounded-full px-5 py-2'>
                        {item.icon}
                        <span className=''>{item.name}</span>
                    </li>
                </Link>
            })}
        </ul>

    </section>
}