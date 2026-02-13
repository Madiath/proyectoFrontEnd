import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    maximas: []
}

export const peliculasSlice = createSlice({
    name: "peliculas",
    initialState,
    reducers: {
        setPeliculas: (state, action) => {
            state.maximas = action.payload;
        }
    }
})

export const { setPeliculas } = peliculasSlice.actions;

export default peliculasSlice.reducer;