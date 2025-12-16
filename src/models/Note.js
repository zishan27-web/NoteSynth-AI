import mongoose from "mongoose";

import React from 'react'

const NoteSchema = new mongoose.Schema(
    {
        userEmail: {
            type: String,
            required: true,
        },
        title:{
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default Note;
