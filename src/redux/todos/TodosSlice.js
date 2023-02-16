import { createSlice } from "@reduxjs/toolkit";


export const TodosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: []
    },
    reducer: {}

});

export default TodosSlice.reducer;