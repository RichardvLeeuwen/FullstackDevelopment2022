import { configureStore } from "@reduxjs/toolkit";
import anecReducer from "./reducers/anecdoteReducer"
import notiReducer from "./reducers/notiReducer";
import filterReducer from "./reducers/filterReducer";

const store = configureStore({
    reducer: {
        anecdotes: anecReducer,
        notifications: notiReducer,
        filter: filterReducer
    }
})

export default store