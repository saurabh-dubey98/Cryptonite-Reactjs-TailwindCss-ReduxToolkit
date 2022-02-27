import { configureStore } from "@reduxjs/toolkit";
import { coinRankingApi } from "../services/coinRankingApi";
import { bingNewsApi } from "../services/bingNewsApi";

export const store = configureStore({
    reducer: {
        [coinRankingApi.reducerPath]: coinRankingApi.reducer,
        [bingNewsApi.reducerPath]: bingNewsApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([coinRankingApi.middleware, bingNewsApi.middleware])
})