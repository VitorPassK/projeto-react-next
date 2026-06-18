import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
    href: string;
    title: string;
    tag: string;
    tagStyle: string;
    date: string;
}

interface FavoritesState {
    posts: Post[];
}

const initialState: FavoritesState = {
    posts: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<Post>) {
            const exists = state.posts.find((p) => p.href === action.payload.href);
            if (!exists) state.posts.push(action.payload);
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state.posts = state.posts.filter((p) => p.href !== action.payload);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;