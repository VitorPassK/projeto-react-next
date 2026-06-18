import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    query: string;
    activeCategory: string | null;
}

const initialState: SearchState = {
    query: "",
    activeCategory: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setActiveCategory(state, action: PayloadAction<string | null>) {
            state.activeCategory = action.payload;
        },
        clearSearch(state) {
            state.query = "";
            state.activeCategory = null;
        },
    },
});

export const { setQuery, setActiveCategory, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;