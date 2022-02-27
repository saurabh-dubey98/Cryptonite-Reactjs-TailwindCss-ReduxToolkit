import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { BiBitcoin, BiNews } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";


const Navbar = ({ toggle, setToggle }) => {
    const location = useLocation();
    const navLinks = [
        {
            name: 'Home',
            path: '/',
            icon: <MdHome />
        },
        {
            name: 'Cryptocurrencies',
            path: '/cryptocurrencies',
            icon: <BiBitcoin />
        },
        {
            name: 'News',
            path: '/news',
            icon: <BiNews />
        },
    ]

    return <div className={`lg:col-span-2 md:col-span-3 col-span-1 bg-very-dark-blue md:sticky fixed md:top-0 md:left-0 h-screen w-64 md:w-auto overflow-hidden z-10 duration-300 ${toggle ? 'left-0' : '-left-full'}`}>
        <Link to="/" onClick={setToggle}>
            <div className="ml-4 mt-4 mb-6 flex items-center text-very-light-blue"><FaEthereum className="mr-2 text-3xl" />Cryptonite</div>
        </Link>
        <div className="">
            {navLinks.map(navItem => (
                <Link onClick={setToggle} to={navItem.path} key={navItem.name} className={`${location?.pathname === navItem.path ? 'bg-very-light-blue text-very-dark-blue pointer-events-none' : 'text-light-blue-2'} flex w-full items-center py-2 pl-6  duration-300 font-medium hover:bg-very-light-blue hover:text-very-dark-blue`}>
                    <span className="mr-3">{navItem.icon}</span>
                    <span>{navItem.name}</span>
                </Link>
            ))}
        </div>
    </div>;
};

export default Navbar;
