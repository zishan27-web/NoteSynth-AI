"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast, Bounce, ToastContainer } from "react-toastify"
import { useAuth } from "../../context/AuthContext"
import Link from "next/link"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [logging, setLogging] = useState(false)
    const { login } = useAuth();

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("All fields required!");
            return;
        }

        try {
            // setLogging(true);
            const res = await fetch('/api/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            if (res.ok) {
                setLogging(false);
                const data = await res.json();
                toast('Login Successfully!', {
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
                login(data.user);
                router.push('/app');
            }
            else {
                setLogging(false);
                // setEmail('');
                // setPassword('');
                const data = await res.json();
                toast.error(data.message, {
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
                setError(data.message);
            }
        } catch (error) {
            console.error("Error during login: ", error);
            setError("Something went wrong. Please try again.");
        }
    }

    const togglePasswordVisibility = ()=>{
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
                <p className="block font-medium text-3xl mx-auto text-white mb-2">Log In</p>
                <form
                    onSubmit={handleSubmit}
                    className='bg-slate-950 text-white border border-black shadow-2xl rounded-lg p-5 sm:w-1/3 w-3/4 hover:scale-105 transition ease-in-out duration-700'
                >
                    <label className="block font-medium mb-2" htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        autoComplete="true"
                        className="border border-white p-1 mb-3 w-full rounded-md"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="block font-medium mb-2" htmlFor="password">Password</label>
                    <div className="relative w-full mb-3">
                        <input
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            className="border border-white p-1 mb-3 w-full rounded-md"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <img
                            onClick={() => togglePasswordVisibility()}
                            src={showPassword ? '/view.png' : '/hide.png'}
                            alt=""
                            className='absolute right-3 invert w-4 h-4 top-2 hover:cursor-pointer hover:scale-110 transition-transform'
                        />
                    </div>
                    <div>
                        <button onClick={()=>(password.length > 0 && email.length > 0) &&setLogging(true)} className="bg-amber-500 border-none p-1 w-full rounded-xl hover:cursor-pointer transition ease-in-out duration-300 hover:bg-amber-600 hover:scale-105">{logging ? 'Logging...' : 'LogIn'}</button>
                    </div>
                    <div className="flex justify-center items-center mt-3.5 gap-1">
                        <span className="text-xs">
                            Not Registered?
                        </span> 
                        <Link className="text-xs text-amber-400 hover:text-amber-600 hover:scale-105 transition-all duration-300 ease-in-out font-medium" href='/register'>Go to SignUp →</Link>
                    </div>
                </form>
            </div>
        </div>

    )
}
