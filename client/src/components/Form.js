import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync } from '../redux/todos/services';

import Error from './Error';
import Loading from './Loading';


function Form() {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    if (!title) return;
    e.preventDefault();

    await dispatch(addTodoAsync({title}));
    setTitle('');
  }

  const isLoading = useSelector(state => state.todos.addNewTodoLoading);
  const isError = useSelector(state => state.todos.addNewTodoError);
  return (
    <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'center'}}>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />

      {isLoading && <Loading />}
      {isError && <Error message={isError} />}
    </form>
  )
}

export default Form