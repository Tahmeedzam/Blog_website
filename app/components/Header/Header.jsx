import { House, Scroll, MessageCircle } from 'lucide-react'
import LoginButton from "./LoginButton"
import React from 'react'

const Header = () => {
    return (
        <nav className='flex justify-between items-center px-7 py-3 border-b'>
            <img className='h-15' src="/zamsLogo.png" alt="Logo" />
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

            <LoginButton />
        </nav>
    )
}

export default Header