import { useRef, useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  let input = useRef<HTMLInputElement>(null);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: ++todos.length, text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    console.log(id);
    setTodos(
      todos.map((todo) =>
        todo.id !== id ? todo : { ...todo, completed: !todo.completed }
      )
    );
  };

  return (
    <>
      <Header todoCount={todos.length} />
      <div>
        <input ref={input} />
        <button
          onClick={(e) => {
            if (!input.current?.value.trim()) return;
            addTodo(input.current.value);
            input.current.value = "";
          }}
        >
          Add Todo
        </button>
      </div>
      {todos.map((todo) => {
        const { id, text } = todo;
        console.log(`Creating ${text}`);
        return (
          <div key={id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(Number(id))}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {text}
            </span>
          </div>
        );
      })}
    </>
  );
};

const Header = ({ todoCount }: { todoCount: number }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <h1>Todo List</h1>
      <p
        style={{
          height: "12px",
          lineHeight: "12px",
          textAlign: "center",
          marginLeft: "20px",
        }}
      >
        todoCount: {todoCount}
      </p>
    </div>
  );
};
export default App;
