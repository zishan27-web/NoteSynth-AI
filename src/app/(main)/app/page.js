'use client'

import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import { useNote } from '../../../context/NoteContext';

export default function HomePage() {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState('');
    const [isCopied, setIsCopied] = useState(false)

    const { selectedNote } = useNote();

    const { user } = useAuth();

    useEffect(() => {
      if (user) {
        toast('Logged in successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
      }
    }, [])
    
    useEffect(() => {
        console.log("selectedNote changed:", selectedNote);
        if (selectedNote) {
            console.log("Setting Summary to:", selectedNote.content);
            console.log("Setting Input to:", selectedNote.title);
            setSummary(selectedNote.content);
            setInputText(selectedNote.title);
        }
    }, [selectedNote])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSummary('');

        try {
            const response = await fetch('api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputText })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setSummary(data.summary);
            setInputText('');
            if (user) {
                console.log("Attempting to save note for:", user.email);
                try {
                    const saveRes = await fetch('/api/notes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: user.email,
                            title: inputText.length > 0 ? inputText.substring(0, 20) + "..." : "New Note",
                            content: data.summary
                        })
                    });
                    if (saveRes.ok) {
                        console.log("Note saved successfully!");
                        // 3. TRIGGER SIDEBAR UPDATE (No Reload!)
                        window.dispatchEvent(new Event('noteSaved'));
                    } else {
                        const errorData = await saveRes.json();
                        console.error("Failed to save note:", errorData);
                    }
                    // console.log("Note saved to history!");
                    // window.location.reload();
                } catch (error) {
                    console.error("Failed to save note", error);
                }
            }else{
                console.log("User not logged in, skipping save.");
            }
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(summary);
            toast('Copied!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy text: ', error);
        }
    };
    return (
        <main className=''>
            {/* Center  */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className='h-screen w-full md:w-3/5 mx-auto relative flex flex-col justify-around'>
                <div className='h-3/5 bg-slate-950 p-5 mt-10 m-2  rounded-xl border-gray-500 border'>
                    {summary ? (
                        <div className='relative w-full'>
                            <button onClick={handleCopy}
                                className='absolute top-0 right-0 text-white flex items-center gap-2 bg-gray-800 rounded-2xl w-fit px-2 py-1 text-xs hover:bg-gray-700 hover:cursor-pointer'>
                                <img src="copy.png" alt="" className='w-3 h-3 invert' />
                            </button>
                            <p className='text-white text-sm pr-16'>{summary}</p>
                        </div>)
                        :
                        (<h1 className='text-center text-gray-600 mb-5'>Paste your text below to generate a summary.</h1>)
                    }

                </div>
                <div className='h-20 p-5 m-5 mb-20 rounded-3xl border text-sm border-gray-600 bg-black sticky'>
                    <form onSubmit={handleSubmit} className='flex gap-2 justify-center items-center'>
                        <textarea name="input" id=""
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder='Place your study notes, article or any block of text here... '
                            className='w-full resize-none border-none focus:outline-none text-white h-1/12'
                        ></textarea>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer px-3 py-2 rounded-2xl  hover:bg-blue-700 text-white'
                        >
                            {isLoading ? 'Generating...' : 'Generate'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
