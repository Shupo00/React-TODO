import {useState} from 'react'

type Todo = {
  id: number;
  text: string;
  completed: boolean;
}
const TodoApp = () => {
    const [todos,setTodos] = useState<Todo[]>([]);
    const [newTodo,setNewTodo] = useState<string>("");
    const [editingTodoId,setEditingTodoId] = useState<number | null>(null);
    const [editingText,setEditingText] = useState<string>("");
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

    const handleStartEditing = (id:number,currentText: string) => {
      setEditingTodoId(id);
      setEditingText(currentText);
    }

    const handleSaveEditing = () => {
      if (editingTodoId == null) 
        return;

      setTodos(
        todos.map((todo) => 
          todo.id === editingTodoId ? {
            ...todo, text:editingText
          }:todo)
      );

      setEditingTodoId(null);
      setEditingText("");
     }

     const handleCancelEditing = () => {
      setEditingTodoId(null);
      setEditingText("");
     }

    const incompleteTodos:number = todos.filter((todo) => !todo.completed).length

  return (
    <>
      <h1>Todoリスト</h1>
      <input type="text" value={newTodo} id="newTodo" onChange={(e) => setNewTodo(e.target.value)}/>
      <button onClick={handleAddTodo}>追加</button>
      <p>未完了のタスク: {incompleteTodos}件</p>
      <ul>
        {todos.map((todo) =>(
          <li key={todo.id} style={{"margin": "10px 0"}}>
            <input type="checkbox" checked={todo.completed} onChange={()=> toggleTodo(todo.id)} 
             />
             { editingTodoId === todo.id ?(
              <>
                <input type="text"  value={editingText} onChange={(e) =>    
                    setEditingText(e.target.value)}/>
                 <button type="button" onClick={handleSaveEditing}>保存</button>
                  <button type="button" onClick={handleCancelEditing}>キャンセル</button>
                
              </>
             ) :(
               <>
                <span style={{textDecoration: todo.completed ? "line-through" :"none"}}>       
                {todo.text}</span>
                <button onClick={( ) => handleStartEditing(todo.id, todo.text)}>編集</button>
               </>
                
             
          </li>
        ))}
      </ul>
    </>
    
  );
};

export default TodoApp