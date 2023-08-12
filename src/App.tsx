import { useLayoutEffect, useState } from 'react';
import './App.css'
import {Todo, todoStore} from './state';

function App() {
  const [todos, setTodos] = useState<Todo[]>(todoStore.initialState);

  useLayoutEffect(() => {
    todoStore.subscribe(setTodos);
    todoStore.init();
  },[]);

  return (
    <div className="outer-container">
      <div className="container">
        <h1>RxJS Todolist</h1>
        <ul>
          {todos.map(todo => {
            return <li key={todo.id}><label htmlFor={todo.id}><input id={todo.id} type="checkbox" />{todo.label}</label></li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default App
