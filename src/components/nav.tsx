"use client"
import { Button } from '@ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { CiMenuFries } from 'react-icons/ci';
const links = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Resume", path: "/resume" },
    { label: "Work", path: "/work" },
    { label: "Contact", path: "/contact" },
]
const Nav = () => {
    const path = usePathname();
    return (
        <>
            <nav className='hidden md:flex gap-8'>
                {links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.path}
                        className={`${path === link.path && "text-accent border-b-2 border-accent"} font-medium transition-all hover:text-accent `}>
                        {link.label}
                    </Link>

                ))}
                <Link href='/contact' className='hidden lg:block'>
                    <Button>Hire me</Button>
                </Link>
                <Button className='hidden md:block lg:hidden rounded-full'>Hire me</Button>
            </nav>

            <div className='md:hidden'>
                <Sheet>
                    <SheetTrigger className='flex justify-center items-center'>
                        <CiMenuFries className='text-accent text-[32px]' />
                    </SheetTrigger>
                    <SheetContent className='flex flex-col'>
                        <Link href='/'>
                            <h1 className='text-4xl font-semibold italic'>
                                Jimmy
                                <span className='text-accent not-italic'>.</span>
                            </h1>
                        </Link>
                        <nav className='flex flex-col grow justify-between bg-red-600'>
                            <div className='flex flex-col items-center gap-8 bg-yellow-400'>
                                {links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.path}
                                        className={`${path === link.path && "text-accent border-b-2 border-accent"} font-medium transition-all hover:text-accent `}>
                                        {link.label}
                                    </Link>

                                ))}
                            </div>
                            <Link href='/contact' className='w-full flex justify-center bg-gray-500'>
                                <Button className='w-11/12 my-8'>Hire me</Button>
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}

export default Nav;
