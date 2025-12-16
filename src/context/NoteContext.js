"use client";

import { createContext, useState, useContext } from 'react';

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    // This state will hold the note that the user clicked on
    const [selectedNote, setSelectedNote] = useState(null);

    return (
        <NoteContext.Provider value={{ selectedNote, setSelectedNote }}>
            {children}
        </NoteContext.Provider>
    );
};

export const useNote = () => useContext(NoteContext);