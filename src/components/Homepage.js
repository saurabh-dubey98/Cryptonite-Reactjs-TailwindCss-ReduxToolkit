import React from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';

import { useGetCryptosQuery } from '../services/coinRankingApi';
import Stats from './Stats';
import { CryptoCurrencies, ErrorHandler, LoadingSpinner, News } from '.';

const Homepage = () => {
    const { data, error } = useGetCryptosQuery(10);
    const stats = data?.data?.stats;

    if (error) {
        return <ErrorHandler error={error} />
    }

    if (!data) {
        return <LoadingSpinner />
    }
    return <>
        <h2 className="sm:text-3xl text-2xl font-semibold sm:font-medium mb-5 md:mt-5">Global State</h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Stats statName="Total Cryptocurrencies" statData={`${stats.total}`} />
            <Stats statName="Total 24h Volume" statData={`$${millify(stats.total24hVolume)}`} />
            <Stats statName="Total Exchanges" statData={`${stats.totalExchanges}`} />
            <Stats statName="Total Market Cap" statData={`$${millify(stats.totalMarketCap)}`} />
            <Stats statName="Total Markets" statData={`${millify(stats.totalMarkets)}`} />
        </section>


        <section>
            <div className="flex items-center justify-between mt-8 mb-5">
                <h2 className="sm:text-3xl text-2xl font-semibold sm:font-medium">Top 10 Cyptos</h2>
                <Link to="/cryptocurrencies" className="font-semibold text-light-blue sm:text-lg text-base">Show more</Link>
            </div>
            <CryptoCurrencies only10 />

            <div className="flex items-center justify-between mt-8 mb-5">
                <h2 className="sm:text-3xl text-2xl font-semibold sm:font-medium">Latest Crypto News</h2>
                <Link to="/news" className="font-semibold text-light-blue sm:text-lg text-base">Show more</Link>
            </div>
            <News homepageVer />
        </section>
    </>;
};

export default Homepage;
