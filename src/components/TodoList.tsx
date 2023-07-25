import React from "react";
import { Todo, TodoContext, useContext } from "../stores/context";
import SingleTodo from "./SingleTodo";

interface TodoListProps {
  todo?: Todo;
  index?: number;
}

const TodoList: React.FC<TodoListProps> = () => {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <div className="todo-full-list">
      <ul className="todo-ul">
        {filteredTodos.map((todo, index) => (
          <li key={todo.id} className="todo-li">
            <div className="todo-checkbox-arrangement">
              <SingleTodo todo={todo} index={index} key={todo.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
