import { configureStore } from "@reduxjs/toolkit";
import anecReducer from "./reducers/anecdoteReducer"

const store = configureStore({
    reducer: {
        anecdotes: anecReducer
    }
})

export default store