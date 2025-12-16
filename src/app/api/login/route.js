import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid email or password! " },
                { status: 400 }
            );
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json(
                { message: "Invalid email or password! " },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Login Successful!", user: { name: user.name, email: user.email } },
            { status: 200 }
        )
    } catch (error) {
        console.error("Login error: ", error);
        return NextResponse.json(
            { message: "An error occured during Logging in." },
            { status: 500 }
        );
    }
}

/**
NOTE: 
Notice that if the email is wrong OR the password is wrong, we return the exact same error message: "Invalid email or password."
This is a security standard. We do not want to tell a hacker "The email is correct, but the password is wrong," because that tells them the email exists in your system!
 */