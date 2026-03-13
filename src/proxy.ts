import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET
    });

    const { pathname } = req.nextUrl;

    // Protect admin routes
    if (pathname.startsWith("/admin") && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
