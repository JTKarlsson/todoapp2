import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import { apiService } from './services';

export type Todo = {
  id: number;
  title: string;
  isDone: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[] | undefined>(undefined)
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {

    const fetchTodos = async () => {
      try {
        const listOFTodos = await apiService.getTodos()
        setTodos(listOFTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(event.target.value);
  };

  const createNewTodo = async () => {
    if(newTodoText === "") return;
    const newTodo = await apiService.createTodo(newTodoText);

    if (todos) {
      setTodos([...todos, newTodo]);
    } else {
      setTodos([newTodo]);
    }
    setNewTodoText("");
  }

  const deleteTodoItem = async (todoId: number) => {
    await apiService.deleteTodo(todoId);
    const newTodos = todos?.filter(({id}) => id !== todoId);
    setTodos(newTodos);
  }

  const toggleIsDone = async (todoId: number) => {
    if(!todos) return;
    const index = todos.findIndex((todo) => todo.id === todoId);
  
    if (index !== -1) {
      const updatedTodo = { ...todos[index], isDone: !todos[index].isDone };

      await apiService.updateTodo(todoId, updatedTodo);

      const updatedTodos = [...todos];
      updatedTodos[index] = updatedTodo;

      setTodos(updatedTodos);
    } 
  };


  return (
    <>
      <input type="text" value={newTodoText} onChange={handleInputChange} /><button onClick={createNewTodo}>Add</button>
      <section>
        <h2>Todos</h2>
        <ul>
          {todos?.map((todo) => {
            if (!todo.isDone) {
              return (
                <li key={todo.id}>
                  {todo.title}
                  <button onClick={() => toggleIsDone(todo.id)}>DONE</button>
                  <button onClick={() => deleteTodoItem(todo.id)}>DELETE</button>
                </li>
              )
            }
          })}
        </ul>
      </section>
      <section>
        <h2>Dones</h2>
        <ul>
          {todos?.map((todo) => {
            if (todo.isDone) {
              return (
                <li key={todo.id}>
                  {todo.title}
                  <button onClick={() => toggleIsDone(todo.id)}>UNDONE</button>
                  <button onClick={() => deleteTodoItem(todo.id)}>DELETE</button>
                </li>
              )
            }
          })}
        </ul>
      </section>
    </>
  )
}

export default App
