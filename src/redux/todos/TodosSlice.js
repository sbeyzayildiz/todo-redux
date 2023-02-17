import { createSlice, nanoid } from "@reduxjs/toolkit";

export const TodosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [
            {
                id: '1',
                title: 'Learn Javascript',
                completed: true
            },
            {
                id: '2',
                title: 'Learn React',
                completed: false,
            },
            {
                id: '3',
                title: 'Learn Redux',
                completed: false
            },
        ],
        activeFilter: 'all'
    },
    reducers: {
        addTodo:{
            reducer: (state, action) => {
                state.items.push(action.payload);
            },
            prepare: ({title}) => {
                return {
                    payload: {
                        id: nanoid(),
                        completed: false,
                        title
                    }
                }
            }
        } ,
        toggle: (state, action) => {
            const { id } = action.payload;
            const todo = state.items.find(item => item.id === id);
            todo.completed = !todo.completed;
        },
        destroy: (state, action) => {
            const { id } = action.payload;
            const todoIndex = state.items.findIndex(item => item.id === id);
            state.items.splice(todoIndex, 1);
        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filterUnCompleted = state.items.filter(item => item.completed === false);
            state.items = filterUnCompleted;
        }
    }

});

export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
    if(state.todos.activeFilter === 'all') {

        return state.todos.items;
    }

    return state.todos.items.filter((todo) => state.todos.activeFilter === 'active' ? todo.completed === false : todo.completed === true);
}

export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted, } = TodosSlice.actions;
export default TodosSlice.reducer;