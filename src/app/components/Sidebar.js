'use client'
import Link from 'next/link';
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNote } from '../../context/NoteContext';
import { on } from 'events';

export default function Sidebar({ isOpen, onClose }) {
    const { user, logout } = useAuth();
    const [isSerachOpen, setIsSerachOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [notes, setNotes] = useState([]);

    const { setSelectedNote } = useNote();

    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen, onClose])


    const fetchNotes = async () => {
        if (!user?.email) {
            return;
        }
        try {
            const res = await fetch(`/api/notes?email=${user.email}`);
            const data = await res.json();
            if (res.ok) {
                setNotes(data.notes);
            }
        } catch (error) {
            console.error("Failed to fetch history: ", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchNotes();
            window.addEventListener('noteSaved', fetchNotes)
        } else {
            setNotes([]);
        }
        return () => {
            window.removeEventListener('noteSaved', fetchNotes);
        }
    }, [user])

    const filteredHistory = (notes || []).filter((item) => {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase())
    });
    // OR,
    // const filteredHistory = historyData.filter((item) => 
    //     return item.title.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    // const formatData = (dataString) =>{
    //     const options = { month: 'short', day: 'numeric'};
    //     return new Date(dateString).toLocaleDateString('en-US', options);
    // }

    return (
        <main>
            <aside
                ref={sidebarRef}
                className={`flex flex-col gap-2 fixed top-0 left-0 h-full w-72 bg-slate-950 border-r border-gray-700 text-white z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* HEADER - START */}
                <div className='p-3 flex justify-between flex-col'>
                    {isSerachOpen ?
                        (
                            <input
                                type="text"
                                autoFocus
                                placeholder='Search notes'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full border border-amber-500 focus:outline-none rounded-md bg-gray-900 text-white text-sm py-1 mb-3 px-0.5'
                                onBlur={() => !searchQuery && setIsSerachOpen(false)}
                            />
                        ) : (
                            <h3 className='font-mono font-bold mx-auto mt-1 text-amber-500'>NoteSynth AI</h3>
                        )}
                    <div className='flex justify-between'>
                        {/* SEARCH LOGIC - START */}

                        <button onClick={() => setIsSerachOpen(true)} className='p-2 rounded-3xl bg-gray-800 hover:cursor-pointer hover:scale-110 transition-transform duration-400 '>
                            <img src="search_1.png" alt="" className='w-3 h-3 invert' />
                        </button>
                        <button
                            onClick={onClose}
                            className='p-2 rounded-3xl bg-gray-800 hover:cursor-pointer hover:scale-110 transition-transform duration-400 '
                        >
                            <img src="cross_1.png" alt="" className='w-3 h-3 invert' />
                        </button>
                    </div>
                </div>
                {/* HEADER - END */}
                {/* ----------------------------------------------------------------------------------- */}
                {/* MAIN CONTENT - START */}
                <div className='flex justify-center items-center w-11/12 bg-gray-900 h-3/4 mx-auto rounded-2xl mb-3.5 overflow-auto'>
                    {user ? (
                        <div className='space-y-2 w-full px-4 self-start mt-4'>
                            <h3 className="text-xs text-gray-500 font-semibold uppercase mb-2">{searchQuery ? 'Search Results' : 'History'}</h3>
                            {/* Map through history items here later */}
                            {searchQuery ? (
                                filteredHistory.length > 0 ? (
                                    filteredHistory.map((item) => (
                                        <div
                                            key={item._id}
                                            className="group flex justify-between items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer text-sm text-gray-300 transition-all duration-300"
                                            onClick={() => {
                                                setSelectedNote(item);
                                                console.log(`${item.title} is selected!`)
                                                if (window.innerWidth < 786) {
                                                    onClose();
                                                }
                                            }}
                                        >
                                            <span className='text-sm text-gray-300 group-hover:text-white truncate max-w-40'>{item.title}</span>
                                            <span className='text-[10px] text-gray-600 group-hover:text-gray-400'>{item.date}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 text-center mt-4">No notes found.</p>
                                )
                            ) : (
                                (notes || []).map((i) => (
                                    <div key={i._id}
                                        onClick={() => {
                                            setSelectedNote(i);
                                            console.log(`${i.title} is selected!`)
                                            if (window.innerWidth < 786) {
                                                onClose();
                                            }
                                        }} className="p-2 hover:bg-gray-800 rounded cursor-pointer text-sm text-gray-300">
                                        {i.title}
                                    </div>
                                ))
                            )
                            }

                        </div>
                    ) : (
                        <div>
                            <section className='text-white text-sm '>
                                <p>Sign-Up to Unlock History feature</p>
                                <div className='flex justify-center items-center gap-6 m-3'>
                                    <div className='bg-amber-500 border-0 rounded-xl  hover:cursor-pointer hover:bg-amber-600 hover:scale-105 translate duration-300 ease-in-out px-3 pb-1.5 pt-1'>
                                        <Link href='/register'>
                                            SignUp
                                        </Link>
                                    </div>
                                    <div className='bg-amber-500 border-0 rounded-xl  hover:cursor-pointer hover:bg-amber-600 hover:scale-105 translate duration-300 ease-in-out px-3 pb-1.5 pt-1'>
                                        <Link href='/login'>
                                            LogIn
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
                {/* MAIN CONTENT - END */}
                {/* ----------------------------------------------------------------------------------- */}
                {/* FOOTER - START */}
                {user &&
                    (
                        <div className='p-2 border-t border-gray-800 bg-slate-950'>
                            <div className='flex items-center justify-between gap-1 my-2'>
                                <div className='flex justify-center items-center gap-2 overflow-hidden'>
                                    <div className='rounded-full bg-linear-to-tr from-amber-50 to-orange-600 text-lg font-bold text-black flex justify-center items-center w-9 h-9'>
                                        {user ? user.name[0].toUpperCase() : 'U'}
                                    </div>
                                    <p className='overflow-hidden'>{user.name}</p>
                                </div>
                                <button onClick={() => logout()} className='bg-amber-500 border-0 rounded-xl font-medium text-sm hover:cursor-pointer hover:bg-amber-600 hover:scale-105 translate duration-300 ease-in-out px-2 pb-1.5 pt-0.5'>LogOut</button>
                            </div>
                        </div>
                    )}
                {/* FOOTER - END */}
                {/* ----------------------------------------------------------------------------------- */}
            </aside>
        </main>
    )
}
