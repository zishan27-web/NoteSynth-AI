'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from './components/Footer';
import Features from './components/Features';

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <div className="flex justify-center flex-col items-center gap-10">
        <h1 className="text-amber-500 text-center text-5xl mt-16 font-extrabold tracking-tight md:text-7xl">NoteSynth AI</h1>

        <p className="text-white text-center font-light text-lg md:text-xl">Transform your notes into powerful study materials instantly.</p>

        <button type="button"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => router.push('/app')}
        >Get Started</button>
      </div>
      <hr className="h-6 w-11/12 mx-auto text-gray-500 mt-7 mb-3 " />
      <Features/>
      <Footer/>
    </main>
  );
}
