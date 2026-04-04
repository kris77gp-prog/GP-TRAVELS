
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, LogOut, LayoutDashboard } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { CONTACT_INFO } from '@/lib/data';

const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Fleet', href: '/cars' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export const NavbarClient = ({ settings }: { settings: Record<string, string> }) => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const phone = settings.phone || CONTACT_INFO.phone;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when pathname changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            <nav
                className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 gpu-boost",
                (scrolled || isOpen || pathname !== "/") 
                    ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-white/5 py-3 shadow-md text-slate-900 dark:text-white" 
                    : "bg-gradient-to-b from-black/15 via-transparent to-transparent text-white"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative z-[110]">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative h-20 min-w-[200px] flex items-center justify-start group-hover:scale-110 transition-transform duration-500 shrink-0">
                        <img 
                            src={settings.logoUrl || "/logo-v4.png"} 
                            alt="GP Tours & Travels Logo" 
                            className={cn(
                                "h-full w-auto object-contain transition-all duration-500 rounded-2xl",
                                (scrolled || isOpen || pathname !== "/") 
                                ? "brightness-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" 
                                : "filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                            )}
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-[15px] font-bold tracking-wide transition-all duration-300 relative",
                                pathname === link.href 
                                    ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                                    : (scrolled || isOpen || pathname !== "/")
                                        ? "text-slate-600 dark:text-slate-400 hover:text-primary"
                                        : "text-white hover:text-primary-foreground drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Admin Specific Controls */}
                    {session && (
                        <>
                            <div className="h-6 w-px bg-border/20 mx-2" />
                            <div className="flex items-center gap-6">
                                <Link
                                    href="/gp-portal-2026"
                                    className="text-sm font-bold text-primary flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Admin
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className={cn(
                                        "text-sm font-bold transition-colors flex items-center gap-2 hover:text-red-500",
                                        (scrolled || isOpen || pathname !== "/")
                                            ? "text-slate-600 dark:text-slate-400"
                                            : "text-white hover:text-red-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                                    )}
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </>
                    )}

                    <Button href={`tel:${phone}`} size="sm" className="gap-2">
                        <Phone className="w-4 h-4" />
                        Book Now
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn(
                        "md:hidden p-2 transition-colors relative z-[110]",
                        (scrolled || isOpen || pathname !== "/") ? "text-slate-900 dark:text-white" : "text-white"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
        </nav>

        {/* Mobile Nav Overlay */}
        <div
            className={cn(
                "fixed inset-0 bg-white dark:bg-slate-950 z-[200] md:hidden transition-all duration-500 ease-in-out px-4 flex flex-col items-center gpu-boost",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
            )}
        >
                <div className="w-full flex items-center justify-between py-6 relative z-[210]">
                    <div className="h-12 w-auto">
                        <img src={settings.logoUrl || "/logo-v4.png"} alt="Logo" className="h-full w-auto object-contain rounded-xl" />
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="p-3 bg-slate-100 dark:bg-white/10 rounded-full text-slate-900 dark:text-white transition-transform active:scale-95"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="pt-8 w-full max-w-sm flex flex-col gap-8 text-center relative z-[300] pointer-events-auto">
                    <div className="bg-slate-50/50 dark:bg-white/5 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-inner">
                        <div className="grid grid-cols-2 gap-4">
                            {NAV_LINKS.map((link, i) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center justify-center h-16 rounded-2xl border transition-all duration-300 font-black text-[13px] tracking-widest uppercase shadow-sm",
                                        pathname === link.href 
                                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-[1.05]" 
                                            : "bg-white border-slate-200 text-slate-900 active:scale-95"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {session && (
                            <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-white/10">
                                <Link
                                    href="/gp-portal-2026"
                                    className="h-16 flex items-center justify-center gap-3 rounded-2xl bg-primary text-white font-black text-[13px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20"
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    Admin Panel
                                </Link>
                                <button
                                    onClick={() => {
                                        signOut({ callbackUrl: '/' });
                                        setIsOpen(false);
                                    }}
                                    className="h-14 flex items-center justify-center gap-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-black text-[13px] uppercase tracking-[0.2em]"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-2">
                        <Button href={`tel:${phone}`} size="lg" className="w-full h-20 rounded-[2rem] text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20">
                            <Phone className="w-5 h-5 mr-3" />
                            Direct Call
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
