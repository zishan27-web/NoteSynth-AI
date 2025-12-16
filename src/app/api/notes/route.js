import { connectDB } from "../../../lib/mongodb";
// import Note from "./models/Note";
import Note from "../../../models/Note";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        if(!email)
        {
            return NextResponse.json({ message: 'Email id required!' }, { status: 400 });
        }
        await connectDB();

        const notes = await Note.find({ userEmail: email}).sort({ createdAt: -1 });
        return NextResponse.json({ notes }, { status: 200 });

    } catch (error) {
        console.error('Error fetching notes: ', error);
        return NextResponse.json({ message: 'Error fetching notes!' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const { email, title, content } = await req.json();
        if (!email || !title || !content) {
            return NextResponse.json({ message: 'Missing data' }, { status: 400 });
        }
        await connectDB();

        await Note.create({
            userEmail: email,
            title, 
            content
        });

        return NextResponse.json({ message: 'Note saved successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Error saving notes: ', error);
        return NextResponse.json({ message: 'Error saving notes!' }, { status: 500 });
    }
}