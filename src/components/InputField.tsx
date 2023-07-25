import React, { useRef } from "react";
import "./style.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Todo, TodoContext, useContext } from "../stores/context";

interface InputTodoProps {
  todo?: Todo;
  index?: number;
}

const InputField: React.FC<InputTodoProps> = () => {
  const {
    todoData: { todo, setTodo },
    handleAddTodo,
    completeAll,
  } = useContext(TodoContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      todo: e.target.value,
      id: todo?.id || 0,
      isCompleted: todo?.isCompleted || false,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todo?.todo) {
      handleAddTodo(todo.todo);
      setTodo({ todo: "", id: 0, isCompleted: false });
    }
  };

  return (
    <div className="input">
      <input
        className="input_box"
        type="text"
        ref={inputRef}
        value={todo?.todo || ""}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
      />
      <span className="icon" onClick={() => completeAll()}>
        <MdOutlineArrowForwardIos />
      </span>
    </div>
  );
};

export default InputField;
