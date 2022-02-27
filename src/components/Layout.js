import React, { useState } from 'react';
import Header from './Header/Header';
import Footer from './Footer';
import Navbar from './Header/Navbar';

export const Layout = ({ children }) => {
    const [menuToggle, setMenuToggle] = useState(false);
    const menuHandler = () => {
        setMenuToggle(prev => !prev)
    }
    return <main className="grid grid-cols-1 md:grid-cols-10">
        <Navbar toggle={menuToggle} setToggle={menuHandler} />
        <div className="col-span-1 lg:col-span-8 md:col-span-7 flex flex-col min-h-screen w-full">
            <Header menuHandler={menuHandler} />
            <div className="px-5 mb-5">
                {children}
            </div>
            <Footer />
        </div>
    </main>;
};

export default Layout;