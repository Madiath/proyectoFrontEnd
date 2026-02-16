import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todasPeliculas: [],
    categorias: [],
    peliculasFiltradas: []
}

export const peliculasSlice = createSlice({
    name: "peliculas",
    initialState,
    reducers: {
        setPeliculas: (state, action) => {
            state.todasPeliculas = action.payload;
            state.peliculasFiltradas = action.payload;
        },
        setCategorias: (state, action) => {
            state.categorias = action.payload;
        },

        guardarPelicula: (state, action) => {
            state.todasPeliculas.push(action.payload);
            state.peliculasFiltradas.push(action.payload);
        },

        eliminarPelicula: (state, action) => {
            state.todasPeliculas = state.todasPeliculas.filter(
                peli => peli.id !== action.payload
            );

            state.peliculasFiltradas = state.peliculasFiltradas.filter(
                peli => peli.id !== action.payload
            );
        },

        filtrarPorFecha: (state, action) => {
            const fecha = action.payload;

            state.peliculasFiltradas = state.todasPeliculas.filter(
                peli => peli.fechaEstreno === fecha
            );
        },

        limpiarFiltro: (state) => {
            state.peliculasFiltradas = state.todasPeliculas;
        }
    }
});

export const { 
    setPeliculas,
    setCategorias, 
    guardarPelicula, 
    eliminarPelicula, 
    filtrarPorFecha, 
    limpiarFiltro 
} = peliculasSlice.actions;

export default peliculasSlice.reducer;
