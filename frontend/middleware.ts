import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")
    if (!token) {
        return NextResponse.redirect(new URL("/", req.url).toString())
    }
    return NextResponse.next()
}

export const config = {
    matcher: '/dashboard',
}