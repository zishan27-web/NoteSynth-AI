// src/app/(main)/layout.js
'use client';

import { useState } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { NoteProvider } from '../../context/NoteContext';

export default function MainAppLayout({ children }) {
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <NoteProvider>
      <div className="min-h-screen fixed inset-0 -z-10 h-full w-full items-center bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px]">
        <Navbar onMenuClick={openSidebar} />

        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main>
          {children}
        </main>
      </div>
    </NoteProvider>
  );
}