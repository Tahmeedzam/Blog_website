"use client"

import { useAuth } from '@/lib/contexts/AuthContext'
import { LogOut } from 'lucide-react';
import React from 'react'

const LoginButton = () => {

    const {
        user,
        isLoading,
        error,
        handleSignInWithGoogle,
        handleLogout,
    } = useAuth();

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (user) {
        return <div className='flex gap-1 items-center'>
            <div className='flex gap-3 rounded-xl bg-yellow-100 px-3 py-2'>
                {/* <img src={user.photoURL} alt="User image" /> */}
                <div>
                    <h1 className='text-md font-medium'>Welcome,</h1>
                    <h1>{user?.displayName}</h1>
                </div>
            </div>
            <button
                onClick={() => {
                    handleLogout();
                }}
                className='text-red-700 px-3 py-1'>
                <LogOut />
            </button>
        </div >
    }

    return (
        <button
            onClick={() => {
                handleSignInWithGoogle();
            }}
            className='bg-gray-300 text-white px-4 py-1 rounded-full'>
            Login
        </button>
    )
}

export default LoginButton