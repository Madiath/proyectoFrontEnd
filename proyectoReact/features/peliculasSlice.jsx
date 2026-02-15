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
        },
        guardarPelicula(state, action) {
            state.maximas.push(action.payload);
        }
    }
})



export const { setPeliculas, guardarPelicula } = peliculasSlice.actions;

export default peliculasSlice.reducer;