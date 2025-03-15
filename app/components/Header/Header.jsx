"use client";

import { House, Scroll, LayoutDashboard } from 'lucide-react';
import LoginButton from "./LoginButton";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import AuthContextProvider from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '../../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useCallback } from 'react';

const Header = () => {
    const router = useRouter();
    const { user, handleSignInWithGoogle } = useAuth();
    // const {
    //     handleSignInWithGoogle,
    // } = useAuth();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleDashboardClick = () => {
        router.push('/admin/posts');

    };

    return (
        <nav className='flex justify-between items-center px-7 py-3 border-b'>
            <Link href={"/"}>
                <img className='h-15' src="/zamsLogo.png" alt="Logo" />
            </Link>
            <ul className='flex gap-8 items-center'>
                <Link href={'/'}>
                    <li className='flex items-center gap-2'>
                        <House />
                        Home
                    </li>
                </Link>
                <Link href={'/categories'}>
                    <li className='flex items-center gap-2'>
                        <Scroll />
                        Categories
                    </li>
                </Link>
                {/* Dashboard link with login check */}
                <li className='flex items-center gap-2 cursor-pointer' onClick={handleDashboardClick}>
                    <LayoutDashboard />
                    Dashboard
                </li>
            </ul>
            <AuthContextProvider>
                <LoginButton />
            </AuthContextProvider>
        </nav>
    );
};

export default Header;
