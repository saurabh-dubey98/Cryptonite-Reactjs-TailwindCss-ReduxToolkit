import React from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaEthereum } from "react-icons/fa";

const Header = ({ menuHandler }) => {
    return <div className="cols-span-10 bg-very-dark-blue sticky top-0 mb-3 md:hidden">
        <div className="w-full flex items-center h-12 justify-between text-very-light-blue ">
            <Link to="/">
                <div className="ml-6 flex items-center"><FaEthereum className="mr-2 text-3xl" />Cryptonite</div>
            </Link>
            <div className="mr-6 cursor-pointer md:hidden" onClick={menuHandler}><GiHamburgerMenu /></div>
        </div>
    </div>;
};

export default Header;
