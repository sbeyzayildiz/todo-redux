import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectFilteredTodos, } from '../redux/todos/TodosSlice';
import { getTodosAsync, toggleTodoAsync, removeTodoAsync } from '../redux/todos/services';
import Loading from './Loading';
import Error from './Error';

function TodoList() {

  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector(state => state.todos.isLoading);
  const isError = useSelector(state => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch])

  const handleToggle = async (id, completed) => {
    await dispatch(toggleTodoAsync({ id, data: { completed: completed } }))
  }

  const handleRemoveTodo = async (id) => {
    await dispatch(removeTodoAsync(id));
  }

  if (isLoading) { return <Loading />; }

  if (isError) { return <Error message={isError} />; }

  return (
    <ul className='todo-list'>
      {
        filteredTodos.map(item => (
          <li key={item.id} className={item.completed ? 'completed' : ''}>
            <div className='view'>
              <input className='toggle' type="checkbox" checked={item.completed} onChange={() => handleToggle(item.id, !item.completed)} />
              <label>{item.title}</label>
              <button className='destroy' onClick={() => handleRemoveTodo(item.id)}></button>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default TodoList