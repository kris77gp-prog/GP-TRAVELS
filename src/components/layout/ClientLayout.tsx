"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactButtons } from "@/components/ui/FloatingContactButtons";

export default function ClientLayout({
    children,
    settings
}: {
    children: React.ReactNode,
    settings: Record<string, string>
}) {
    const pathname = usePathname();

    // Hide Navbar, Footer, and FloatingButtons on admin and login pages
    const isAdminPage = pathname?.startsWith("/admin");
    const isLoginPage = pathname === "/login";
    const shouldHide = isAdminPage || isLoginPage;

    return (
        <>
            {!shouldHide && <Navbar settings={settings} />}
            {children}
            {!shouldHide && <Footer settings={settings} />}
            {!shouldHide && <FloatingContactButtons settings={settings} />}
        </>
    );
}
