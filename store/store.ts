import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slices/favoritesSlice";
import searchReducer from "./slices/searchSlice";
import { shopApi } from "./slices/apiSlice";

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        search: searchReducer,
        [shopApi.reducerPath]: shopApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;