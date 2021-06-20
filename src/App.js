import React, { useEffect, useState } from 'react';
import './styles/App.css';

function App() {
  const [addInput, setAddInput] = useState('');
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    setAllTasks(localStorage.getItem('tasks').split(','))
  }, [])

  function handleSubmit(e) {
    e.preventDefault(allTasks)
    setAllTasks([...allTasks, addInput])
    setAddInput('')
  }

  function handleDelete(e) {
    const elIndex = Number(e.target.dataset.indexNumber);
    setAllTasks(allTasks.filter((_, i) => {
      return i !== elIndex
    }))
  }

  useEffect(() => {
    localStorage.setItem('tasks', allTasks)
  }, [allTasks])

  return (
    <div className="todo__wrapper">
      <form className="add-task" onSubmit={handleSubmit}>
        <input type="text" value={addInput} onChange={e => setAddInput(e.target.value)}/>
        <button type="submit" disabled={!addInput.trim()}>ADD</button>
      </form>
      <ul className="tasks">
        {
          allTasks.length ? allTasks.map((el, i) => {
            return (
              <li key={i} className='task'>
                <p>{el}</p>
                <button data-index-number={i} className="delete-task" onClick={handleDelete}>DELETE</button>
              </li>
            )
          }) : <h1>Task list is empty</h1>
        }
      </ul>
    </div>
  );
}

export default App;