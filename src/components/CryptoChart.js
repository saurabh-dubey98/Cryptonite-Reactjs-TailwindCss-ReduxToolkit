import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useGetCryptoPriceHistoryQuery } from '../services/coinRankingApi';
import { ErrorHandler, LoadingSpinner } from '.';

const CryptoChart = ({ coinId }) => {
    const [timePeriod, setTimePeriod] = useState('24h');
    const [chartData, setChartData] = useState();
    const { data: cryptoHistory, error } = useGetCryptoPriceHistoryQuery({ coinId, timePeriod });
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    useEffect(() => {
        if (cryptoHistory) {
            const chartInfo = {
                labels: cryptoHistory.data.history.map(time => (new Date(time.timestamp * 1000).toLocaleDateString())).reverse(),
                datasets: [{
                    label: 'Price',
                    data: cryptoHistory?.data?.history?.map(amount => parseInt(amount.price)).reverse(),
                    borderColor: "#35858B",
                    backgroundColor: "#AEFEFF"
                }]
            }
            setChartData(chartInfo)
        }
    }, [cryptoHistory])

    if (error) {
        return <ErrorHandler error={error} />
    }

    if (!chartData) {
        return <LoadingSpinner />
    }

    return <div className="mt-5 mb-10">
        <div>
            <select value={timePeriod} className="w-36 py-1 px-2 cursor-pointer outline-none rounded-md border border-light-blue shadow-lg" onChange={e => setTimePeriod(e.target.value)}>
                {time.map(item => (
                    <option value={item} key={item}>{item}</option>
                ))}
            </select>
            <Line data={chartData} />
        </div>
    </div>;
};

export default CryptoChart;
