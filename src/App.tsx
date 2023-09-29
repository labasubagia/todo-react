import { FC, useRef, useState } from 'react';
import './style.css';

interface ITodo {
  task: string;
  isDone: boolean;
}

export const App: FC = () => {
  const inputTextRef = useRef(null);
  const [inputText, setInputText] = useState<string>('');

  const [todos, setTodos] = useState<ITodo[]>([]);

  const toggleDoneTask = (index: number) => {
    setTodos(
      todos.map((todo, i) => {
        if (index != i) return todo;
        todo.isDone = !todo.isDone;
        return todo;
      })
    );
  };

  const addTask = (text: string) => {
    if (!text) return;
    setTodos([...todos, { task: text, isDone: false }]);
    setInputText('');
    inputTextRef.current.value = '';
  };

  const deleteTask = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Todo List</h1>

      <form>
        <input
          ref={inputTextRef}
          type="text"
          placeholder="todo"
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={() => addTask(inputText)} disabled={!inputText}>
          Add Task
        </button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li>
            <p
              style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}
            >
              {todo.task}
            </p>
            <button onClick={() => toggleDoneTask(index)}>
              {todo.isDone ? 'Undone' : 'Done'}
            </button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
