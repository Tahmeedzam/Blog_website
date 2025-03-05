import { House, Scroll, MessageCircle } from 'lucide-react'
import LoginButton from "./LoginButton"
import React from 'react'
import AuthContextProvider from '@/lib/contexts/AuthContext'
import Link from 'next/link'

const Header = () => {
    return (
        <nav className='flex justify-between items-center px-7 py-3 border-b'>
            <Link href={"/"}>
                <img className='h-15' src="/zamsLogo.png" alt="Logo" />
            </Link>
            <ul className='flex gap-8 items-center'>
                <li className='flex items-center gap-2'>
                    <House />
                    Home</li>
                <li className='flex items-center gap-2'>
                    <Scroll />
                    Blogs</li>
                <li className='flex items-center gap-2'>
                    <MessageCircle />
                    Contact us</li>
            </ul>
            <AuthContextProvider>
                <LoginButton />
            </AuthContextProvider>
        </nav>
    )
}

export default Header