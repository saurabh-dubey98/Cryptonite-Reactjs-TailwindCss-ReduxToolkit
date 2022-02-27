import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';

import { useGetCryptosQuery } from '../../services/coinRankingApi';
import Card from '../Card';
import { ErrorHandler, LoadingSpinner } from '..'

const CryptoCurrencies = ({ only10 }) => {
    const [cryptoData, setCryptoData] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const limit = only10 ? 10 : 100;
    const { data, error } = useGetCryptosQuery(limit);

    useEffect(() => {
        setCryptoData(data?.data?.coins);
        const filteredCryptos = data?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm));
        const timeout = setTimeout(() => {
            if (filteredCryptos) {
                setCryptoData(filteredCryptos);
            }
        }, 1000)

        return () => clearTimeout(timeout)
    }, [data, searchTerm])

    if (error) {
        return <ErrorHandler error={error} />
    }

    if (!cryptoData) {
        return <LoadingSpinner />
    }

    return <div>
        {!only10 && <h2 className="sm:text-3xl text-2xl font-medium mb-5 md:mt-5">Crypto Currencies</h2>}
        {!only10 && <input placeholder="Search" className="border mb-6 px-3 py-2 rounded-md focus:border-light-blue outline-none" onChange={e => setSearchTerm(e.target.value)} />}
        {cryptoData?.length === 0 && <p>Nothing found...</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cryptoData.map(item => (
                <Link to={`/crypto/${item.uuid}`} key={item.uuid}>
                    <Card hover>
                        <div className="flex items-center justify-between mb-5">
                            <span className="font-semibold text-lg">{item.name}</span>
                            <img className="h-9 w-9" src={item.iconUrl} alt={item.name} />
                        </div>
                        <div className="leading-8 text-[15px]">
                            <p>Price: {millify(item.price)}</p>
                            <p>Market Cap: {millify(item.marketCap)}</p>
                            <p>Daily Change: {item.change}%</p>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    </div>;
};

export default CryptoCurrencies;
