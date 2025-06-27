import {useState} from 'react'

type Todo = {
  id: number;
  text: string;
  completed: boolean;
}
const TodoApp = () => {
    const [todos,setTodos] = useState<Todo[]>([]);
    const [newTodo,setNewTodo] = useState<string>("");
    const handleAddTodo =() => {
      if(newTodo.trim() === "") return;
      const newTask: Todo = {
        id: Date.now(),
        text:newTodo,
        completed: false,
      }
      setTodos([...todos,newTask]);
      setNewTodo("");
    }

    const toggleTodo = (id:number) => {
      setTodos(
        todos.map((todo) =>
        todo.id == id ? {
          ...todo,completed: !todo.completed 
        }:todo)
      )
    }

  return (
    <>
      <h1>Todoリスト</h1>
      <input type="text" value={newTodo} id="newTodo" onChange={(e) => setNewTodo(e.target.value)}/>
      <button onClick={handleAddTodo}>追加</button>
      <ul>
        {todos.map((todo) =>(
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={()=> toggleTodo(todo.id)} 
             />
             <span style={{textDecoration: todo.completed ? "line-through" :"none"}}>       
               {todo.text}</span>
          </li>
        ))}
      </ul>
    </>
    
  );
};

export default TodoApp