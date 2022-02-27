import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bingHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': process.env.REACT_APP_X_RAPID_API_HOST_BING,
    'x-rapidapi-key': process.env.REACT_APP_X_RAPID_API_KEY_BING
}

const baseUrl = process.env.REACT_APP_BING_NEWS_URL;

const createRequest = url => ({ url, headers: bingHeaders });

export const bingNewsApi = createApi({
    reducerPath: 'bingNews',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getNews: builder.query({
            query: ({ category, count }) => createRequest(`/news/search?q=${category}&freshness=Day&safeSearch=Off&count=${count}`)
        })
    })
})

export const { useGetNewsQuery } = bingNewsApi;