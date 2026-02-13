import { configureStore } from "@reduxjs/toolkit";
import peliculasSlice  from "../features/peliculasSlice";

export const store = configureStore({
    reducer: {
        peliculas: peliculasSlice
    }
})