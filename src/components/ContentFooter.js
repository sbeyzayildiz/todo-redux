import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeActiveFilter, clearCompleted, selectTodos, selectActiveFilter } from '../redux/todos/TodosSlice';
function ContentFooter() {

  const items = useSelector(selectTodos);
  const activeFilter = useSelector(selectActiveFilter);

  const dispatch = useDispatch();

  const itemsLeftLength = items.filter(item => !item.completed).length;
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{itemsLeftLength} </strong> item
        {itemsLeftLength > 1 ? 's' : ''} left
      </span>
      <ul className='filters'>
        <li>
          <a className={activeFilter === 'all' ? 'selected' : ''} href='/#' onClick={() => dispatch(changeActiveFilter('all'))}>All</a>
        </li>
        <li>
          <a href='/#' className={activeFilter === 'active' ? 'selected' : ''} onClick={() => dispatch(changeActiveFilter('active'))}>Active</a>
        </li>
        <li>
          <a href='/#' className={activeFilter === 'completed' ? 'selected' : ''} onClick={() => dispatch(changeActiveFilter('completed'))}>Completed</a>
        </li>
      </ul>

      <button className='clear-completed' onClick={() => dispatch(clearCompleted())}>
        Clear completed
      </button>

    </footer>
  )
}

export default ContentFooter