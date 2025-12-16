import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        
        await connectDB();
    
        const userExist = await User.findOne({ email });
    
        if(userExist)
        {
            return NextResponse.json(
                { message: "User already exists!" },
                { status: 400 }
            );
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
    
        return NextResponse.json(
            { message: "User registered!" },
            { status: 201 },
        );
    } catch (error) {
        console.error("Registration error: ", error);
        return NextResponse.json(
            { message: "An error occured while registering the user! "},
            { status: 500 }
        );
    }
}