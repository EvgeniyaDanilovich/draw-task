import { configureStore } from '@reduxjs/toolkit';
import { desksReducer } from './desks-slice';

export const store = configureStore({
    reducer: {
        desks: desksReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});