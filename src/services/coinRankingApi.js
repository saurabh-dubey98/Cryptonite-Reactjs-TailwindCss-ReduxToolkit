import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiHeaderFile = {
    'x-rapidapi-host': process.env.REACT_APP_X_RAPID_API_HOST,
    'x-rapidapi-key': process.env.REACT_APP_X_RAPID_API_KEY
}

const baseUrl = process.env.REACT_APP_COIN_RANKING_BASE_URL;

const createRequest = url => ({ url, headers: apiHeaderFile });

export const coinRankingApi = createApi({
    reducerPath: 'coinRanking',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: limit => createRequest(`/coins?limit=${limit}`)
        }),
        getCryptoDetails: builder.query({
            query: coinId => createRequest(`/coin/${coinId}`)
        }),
        getCryptoPriceHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        })
    })
})

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoPriceHistoryQuery } = coinRankingApi;