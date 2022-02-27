import moment from 'moment';
import React, { useState } from 'react';
import { useGetNewsQuery } from '../../services/bingNewsApi';
import { useGetCryptosQuery } from '../../services/coinRankingApi';

import Card from '../Card';
import { ErrorHandler, LoadingSpinner } from '..';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ homepageVer, singleCryptoNews }) => {
    const [category, setCategory] = useState(singleCryptoNews || 'Cryptocurrency');
    const { data, error: newsError } = useGetNewsQuery({ category, count: homepageVer ? 6 : 12 });
    const { data: coinNames, error: cryptoError } = useGetCryptosQuery(20);

    if (newsError) {
        return <ErrorHandler error={newsError} />
    }
    if (cryptoError) {
        return <ErrorHandler error={cryptoError} />
    }

    if (!data || !coinNames) {
        return <LoadingSpinner />
    }

    return <div>
        {!homepageVer && <h2 className="sm:text-3xl text-2xl font-medium mb-5 md:mt-5">Latest Crypto News</h2>}

        {!homepageVer && <select value={category} className="w-36 py-1 px-2 mb-4 cursor-pointer outline-none rounded-md border border-light-blue shadow-lg" onChange={e => setCategory(e.target.value)}>
            <option value="Cryptocurrency">Cryptocurrency</option>
            {coinNames.data.coins.map(item => (
                <option value={item.name} key={item.name}>{item.name}</option>
            ))}
        </select>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {data.value.map(news => {
                const { datePublished, name, image, provider, url } = news;

                return <a href={url} target="_blank" key={name} rel="noreferrer">
                    <Card hover>
                        <div className="flex mb-4 justify-between">
                            <h3 className="font-medium">{name}</h3>
                            <img className="w-[100px] h-[100px] object-cover ml-3 rounded-md" src={(image && image.thumbnail.contentUrl) || demoImage} alt={name} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img className="w-[30px] mr-2" src={(provider[0].image && provider[0].image.thumbnail.contentUrl) || demoImage} alt={provider[0]?.name} />
                                <span className="text-[13px] font-semibold mr-3">{provider[0].name}</span>
                            </div>
                            <span className="text-[13px] font-semibold ml-auto mr-2 text-light-blue">{moment(datePublished).format('hh:mm A')}</span>
                            <span className="text-[13px] font-semibold">{moment(datePublished).format('DD/MM/YYYY')}</span>
                        </div>
                    </Card>
                </a>
            })}
        </div>
    </div>;
};

export default News;
