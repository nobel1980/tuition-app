"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import courses from "@/data/courses.json"; // Dynamic import

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 1. Handle Scroll Effect (Keeping your design)
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 2. Close menus on route change or outside click
    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinks = [
        { name: 'About', href: '/about' },
        { name: 'Subjects', href: '/subjects' },
        {
            name: 'Courses',
            // Now mapping from your JSON
            dropdown: courses.map(c => ({ name: c.title, href: `/courses/${c.slug}` }))
        },
        {
            name: 'Media',
            dropdown: [
                { name: 'Timetable', href: '/timetable' },
                { name: 'Notice Board', href: '/notice' },
            ]
        },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className={cn(
            "sticky top-0 z-[100] transition-all duration-300",
            scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-white py-4"
        )}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-1">
                    <span className="text-2xl font-black text-blue-900 tracking-tighter transition-transform group-hover:scale-105">
                        Ibrahim<span className="text-orange-500">Tuition</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6" ref={dropdownRef}>
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative">
                            {link.dropdown ? (
                                <>
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                                        className="flex items-center gap-1 font-bold text-slate-700 hover:text-orange-500 transition-colors py-2"
                                    >
                                        {link.name}
                                        <ChevronDown size={16} className={cn("transition-transform duration-300", activeDropdown === link.name && "rotate-180")} />
                                    </button>

                                    <AnimatePresence>
                                        {activeDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
                                            >
                                                {link.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        className="block px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-500 transition-colors"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <Link
                                    href={link.href!}
                                    className={cn(
                                        "font-bold transition-colors py-2",
                                        pathname === link.href ? "text-orange-500" : "text-slate-700 hover:text-orange-500"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}

                    <Link
                        href="/login"
                        className="bg-blue-900 hover:bg-orange-600 transition-all text-white px-7 py-2.5 rounded-full font-bold shadow-lg shadow-blue-900/20 active:scale-95"
                    >
                        Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-blue-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer z-50"
                >
                    {isOpen ? <X size={30} /> : <Menu size={30} />}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.dropdown ? (
                                        <div className="space-y-2">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-black px-1">{link.name}</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {link.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        className="text-base font-bold text-slate-800 bg-slate-50 p-3 rounded-lg"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={link.href!}
                                            className={cn(
                                                "text-lg font-bold block p-1",
                                                pathname === link.href ? "text-orange-500" : "text-slate-800"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <Link
                                href="/login"
                                className="w-full text-center bg-blue-900 text-white py-4 rounded-2xl font-black text-lg shadow-xl"
                            >
                                Student Portal Login
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}