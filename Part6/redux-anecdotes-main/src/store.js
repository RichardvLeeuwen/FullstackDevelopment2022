import { configureStore } from "@reduxjs/toolkit";
import anecReducer from "./reducers/anecdoteReducer"
import notiReducer from "./reducers/notiReducer";

const store = configureStore({
    reducer: {
        anecdotes: anecReducer,
        notifications: notiReducer
    }
})

export default store