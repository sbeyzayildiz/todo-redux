import { configureStore } from "@reduxjs/toolkit";
import todosReducer from './todos/TodosSlice';

export const store = configureStore({
    reducer: {
        todos: todosReducer
    }
})