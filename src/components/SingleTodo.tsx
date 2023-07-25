import React from "react";
import { Todo, TodoContext, useContext } from "../stores/context";
import { BsCircle } from "react-icons/bs";

interface SingleTodoProps {
  todo: Todo;
  index: number;
}

const SingleTodo: React.FC<SingleTodoProps> = (props) => {
  const { handleChangeItem, handleRemove } = useContext(TodoContext);

  return (
    <div>
      <input
        type="checkbox"
        className="todo-input"
        defaultChecked={props.todo.isCompleted}
        onChange={() => handleChangeItem(props.todo.id)}
      />
      <label
        className={props.todo.isCompleted ? "todo-label-checked" : "todo-label"}
      >
        {props.todo.todo}
      </label>
      <button
        onClick={() => {
          handleRemove(props.todo.id);
        }}
        className="destroy"
      ></button>
    </div>
  );
};

export default SingleTodo;
