import Nav from '@component/nav';
import Link from 'next/link';
import React from 'react';


const Header = () => {
    return (
        <header className='py-8 xl:py-12 text-white bg-pink-50/20 flex justify-between'>
            <div className='container mx-auto flex justify-between'>
                <Link href='/'>
                    <h1 className='text-4xl font-semibold italic'>
                        Jimmy
                        <span className='text-accent not-italic'>.</span>
                    </h1>
                </Link>
                <Nav />
            </div>
        </header>
    );
}

export default Header;
