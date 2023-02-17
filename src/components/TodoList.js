import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { destroy, toggle, selectFilteredTodos } from '../redux/todos/TodosSlice';


function TodoList() {

  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  return (
    <ul className='todo-list'>
      {
        filteredTodos.map(item => (
          <li key={item.id} className={item.completed ? 'completed' : ''}>
            <div className='view'>
              <input className='toggle' type="checkbox" checked={item.completed} onChange={() => dispatch(toggle({ id: item.id }))} />
              <label>{item.title}</label>
              <button className='destroy' onClick={() => dispatch(destroy({ id: item.id }))}></button>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default TodoList