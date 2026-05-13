'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HomeNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: '/login', label: 'ورود' },
        { href: '/therapists', label: 'مشاوران' },
        { href: '/essays', label: 'مقالات' },

        { href: '/assessments', label: 'تست‌ها' },
        { href: '/services', label: 'خدمات' },
        { href: '/about', label: 'درباره' },
        { href: '/contact-us', label: 'تماس' },

    ];

    return (
        <>
            {/* Desktop Nav - Hidden below 1400px */}
            <nav className="absolute top-25 md:top-16 right-2 md:right-12 lg:right-20 3xl:right-56 z-10 max-w-[calc(100vw-1rem)] hidden min-[1482px]:block">
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-0.5 md:px-4 lg:px-6 py-1.5 md:py-2 lg:py-3 shadow-sm overflow-x-auto">
                    <ul dir="rtl" className="flex space-x-reverse space-x-0.5 md:space-x-2 lg:space-x-4 3xl:space-x-8 font-arabic whitespace-nowrap">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                {item.href === '/services' ? (
                                    <a
                                        href={item.href}
                                        className="text-gray-700 hover:text-teal-600 font-regular transition-all duration-300 px-1 py-0.5 md:px-2 md:py-1 lg:px-3 lg:py-2 3xl:px-8 3xl:py-4 rounded-md text-xs md:text-sm lg:text-base 4xl:text-xl inline-block transform hover:scale-105"
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-gray-700 hover:text-teal-600 font-regular transition-all duration-300 px-1 py-0.5 md:px-2 md:py-1 lg:px-3 lg:py-2 3xl:px-8 3xl:py-4 rounded-md text-xs md:text-sm lg:text-base 4xl:text-xl inline-block transform hover:scale-105"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile Hamburger - Shown below 1482px */}
            <div className="absolute top-4 md:top-10 right-4 md:right-6 z-50 min-[1482px]:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-300"
                >
                    <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Menu Dropdown - Horizontal above 1000px, Vertical below */}
                {isOpen && (
                    <div className="absolute top-6 right-0 mt-2 bg-white/20 backdrop-blur-sm border border-white/30  rounded-lg shadow-lg overflow-hidden">
                        {/* Desktop horizontal layout above 1000px */}
                        <div className="hidden min-[1000px]:block max-w-[calc(100vw-2rem)]">
                            <ul dir="rtl" className="flex space-x-reverse space-x-2 md:space-x-3 font-arabic px-4 md:px-6 py-3 md:py-4">
                                {navItems.map((item) => (
                                    <li key={item.href}>
                                        {item.href === '/services' ? (
                                            <a
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-gray-700 hover:text-teal-600 font-regular transition-all duration-300 px-3 md:px-3 py-2 md:py-3 rounded-md text-sm md:text-base inline-block transform hover:scale-105"
                                            >
                                                {item.label}
                                            </a>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-gray-700 hover:text-teal-600 font-regular transition-all duration-300 px-3 md:px-4 py-2 md:py-3 rounded-md text-sm md:text-base inline-block transform hover:scale-105"
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mobile vertical layout below 1000px */}
                        <div className="min-[1000px]:hidden w-48">
                            <ul dir="rtl" className="flex flex-col font-arabic">
                                {navItems.map((item) => (
                                    <li key={item.href} className="border-b border-white/10 last:border-b-0">
                                        {item.href === '/services' ? (
                                            <a
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-white/10 transition-all duration-300 text-sm"
                                            >
                                                {item.label}
                                            </a>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-white/10 transition-all duration-300 text-sm"
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
