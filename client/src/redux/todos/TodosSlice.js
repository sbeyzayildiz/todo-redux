import { createSlice } from "@reduxjs/toolkit";

import { addTodoAsync, removeTodoAsync, toggleTodoAsync, getTodosAsync } from "./services";

// async işlemler için middleware kullanmamız gerekir. Bunun için thunk ı kullandık.

export const TodosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: 'all',
        addNewTodoLoading: false,
        addNewTodoError: null,
    },
    reducers: {
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filterUnCompleted = state.items.filter(item => item.completed === false);
            state.items = filterUnCompleted;
        }
    },
    extraReducers: {
        // get todos
        [getTodosAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        // add todo
        [addTodoAsync.pending]: (state, action) => {
            state.addNewTodoLoading = true;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload)
            state.addNewTodoLoading = false;
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodoLoading = false;
            state.addNewTodoError = action.error.message;
        },
        //toggle todo
        [toggleTodoAsync.fulfilled]: (state, action) => {
            const { id, completed } = action.payload;
            const todo = state.items.find(item => item.id === id);
            todo.completed = completed;
        },
        //remove todo
        [removeTodoAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
        },
    }

});

export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === 'all') {

        return state.todos.items;
    }

    return state.todos.items.filter((todo) => state.todos.activeFilter === 'active' ? todo.completed === false : todo.completed === true);
}

export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { changeActiveFilter, clearCompleted, } = TodosSlice.actions;
export default TodosSlice.reducer;