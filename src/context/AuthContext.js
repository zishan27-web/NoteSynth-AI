"use client";

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [])

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/");
    }

    const logout = () => {
        setUser("");
        localStorage.removeItem('user');
        router.push('/login');
    }
        

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
