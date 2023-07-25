import React from "react";
import { TodoContext, useContext } from "../stores/context";

interface TodoButtonProps {
  filter: string;
}

const TodoButton: React.FC<TodoButtonProps> = (props) => {
  const { onFilter } = useContext(TodoContext);

  return (
    <a style={{ cursor: "pointer" }} onClick={() => onFilter(props.filter)}>
      {props.filter}
    </a>
  );
};

export default TodoButton;
