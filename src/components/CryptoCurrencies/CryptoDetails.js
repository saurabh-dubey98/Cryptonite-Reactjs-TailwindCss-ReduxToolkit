import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import { useGetCryptoDetailsQuery } from '../../services/coinRankingApi';
import { CryptoChart, LoadingSpinner, News } from '..';
import Card from '../Card';
import { ErrorHandler } from '..';
import millify from 'millify';

const CryptoDetails = () => {
    const [coinData, setCoinData] = useState();
    const { coinId } = useParams();
    const { data, error } = useGetCryptoDetailsQuery(coinId);

    useEffect(() => {
        setCoinData(data?.data?.coin);
    }, [data])

    if (error) {
        return <ErrorHandler error={error} />
    }

    if (!coinData) {
        return <LoadingSpinner />
    }

    return <div>
        <div className="flex items-center justify-center my-6">
            <img className="w-11 h-11 mr-4" src={coinData.iconUrl} alt={coinData.name} />
            <h1 className="mr-3 text-4xl font-semibold">{coinData.name}</h1>
            <span className="text-4xl font-normal">({coinData.symbol})</span>
        </div>
        <CryptoChart coinId={coinId} />
        <div className="my-4 grid grid-cols-1 sm:grid-cols-10 gap-5">
            <div className="col-span-1 sm:col-span-4">
                <Card>
                    <h2 className="text-2xl mb-3 tracking-wider text-light-blue font-semibold">Overview</h2>
                    <table className="w-full">
                        <tbody className="table-headings-left table-data-right row-bottom-border">
                            <tr>
                                <th>Crypto Name:</th>
                                <td>{coinData.name}</td>
                            </tr>
                            <tr>
                                <th>Rank:</th>
                                <td>{coinData.rank}</td>
                            </tr>
                            <tr>
                                <th>24h Volume:</th>
                                <td>{millify(coinData['24hVolume'])}</td>
                            </tr>
                            <tr>
                                <th>Market Cap:</th>
                                <td>{millify(coinData.marketCap)}</td>
                            </tr>
                            <tr>
                                <th>Price:</th>
                                <td>{millify(coinData.price)}</td>
                            </tr>
                            <tr>
                                <th>Website:</th>
                                <td> <a className="duration-300 hover:text-light-blue" href={coinData.websiteUrl} target="_blank" rel="noreferrer">Click here</a></td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
            </div>
            <div className="col-span-1 sm:col-span-6">
                <Card>
                    <h2 className="text-2xl tracking-wider mb-3 text-light-blue font-semibold">Links</h2>
                    <table className="w-full">
                        <tbody className="table-headings-left table-data-right row-bottom-border">
                            {coinData.links.map(link => (
                                <tr key={link.url}>
                                    <th>{link.type}</th>
                                    <td><a target="_blank" rel="noreferrer" className="duration-300 hover:text-light-blue" href={link.url}>{link.name}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>

            <div className="col-span-1 sm:col-span-10">
                <h2 className="text-2xl my-5 text-light-blue font-semibold">Latest news articles related to {coinData.name} :</h2>
                <News homepageVer singleCryptoNews={coinData.name} />
            </div>

            <div className="col-span-1 sm:col-span-10">
                <Card>
                    <h2 className="text-2xl tracking-wider mb-3 text-light-blue font-semibold">Description</h2>
                    <div className="default-h3-and-p">
                        {parser(coinData.description)}
                    </div>
                </Card>
            </div>

        </div>
    </div>;
};

export default CryptoDetails;