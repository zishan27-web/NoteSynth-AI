"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('All fields are required!');
            return;
        }

        try {
            const res = await fetch('/api/register',
                {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );

            if (res.ok) {
                toast('User Registered!', {
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
                const form = e.target;
                form.reset();
                router.push('/login');
            }
            else {
                const data = await res.json();
                const message = data.message;
                console.log("User Registration failed.");
                console.log(message)
                toast.error(message, {
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
                setError(res.message);
            }
        } catch (error) {
            console.error("Error during registration: ", error);
            setError("Something went wrong. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div>
            <Link
                href="/app"
                className="absolute top-0 left-0 text-gray-400 hover:text-white transition flex items-center gap-1 text-sm"
            >
                <span className='rounded-full border-2 border-amber-600 shadow-2xl bg-slate-950 text-amber-500 w-24 h-8 m-2 font-medium flex justify-center items-center text-md'>← Home</span>
            </Link>
            <div className='min-h-screen flex justify-center items-center flex-col'>

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
                <p className='block font-medium text-3xl mx-auto text-white mb-2'>Create an account</p>
                <form
                    onSubmit={handleSubmit}
                    className='bg-slate-950 text-white border-black border-2 shadow-2xl rounded-lg p-5 md:w-1/3 w-3/4 hover:scale-105 transition ease-in-out duration-700'
                >
                    <label className='block font-medium mb-2' htmlFor="name">Name</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Full Name'
                        className='border border-white rounded-md p-1 mb-3 w-full'
                    />
                    <label className='block font-medium mb-2' htmlFor="email">Email</label>
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        className='border border-white rounded-md p-1 mb-3 w-full'
                    />
                    <label className='block font-medium mb-2' htmlFor="password">Password</label>
                    <div className='relative w-full mb-3'>
                        <input
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            className='border border-white rounded-md p-1 mb-3 w-full'
                        />
                        <img
                            onClick={() => togglePasswordVisibility()}
                            src={showPassword ? '/view.png' : '/hide.png'}
                            alt=""
                            className='absolute right-3 invert w-4 h-4 top-2 hover:cursor-pointer hover:scale-110 transition-transform'
                        />
                    </div>
                    <div>
                        <button
                            onClick={() => (name.length > 0 & email.length > 0 & password.length > 0) && setIsRegistering(true)}
                            className='border-none bg-amber-500 rounded-xl p-1 w-full hover:scale-105 transition ease-in-out duration-300 hover:bg-amber-600 hover:cursor-pointer'
                        >{isRegistering ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                    <div className="flex justify-center items-center mt-3.5 gap-1">
                        <span className="text-xs">
                            Already registered?
                        </span>
                        <Link className="text-xs text-amber-400 hover:text-amber-600 hover:scale-105 transition-all duration-300 ease-in-out font-medium" href='/login'>Go to LogIn →</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
