import React from "react";
import TodoButton from "./TodoButton";
import "./style.css";
import { TodoContext, useContext } from "../stores/context";

const Filters = () => {
  const { todoData, getCompletedCount, getActiveCount, onClearCompleted } =
    useContext(TodoContext);

  const completedCount = getCompletedCount();
  const activeCount = getActiveCount();

  const itemWord = activeCount === 1 ? "item" : "items";

  const filters = ["All", "Active", "Completed"];

  return todoData.todos.length > 0 ? (
    <div className="footer">
      <div className="footer-pad">
        <span>
          <strong>{activeCount > 0 ? activeCount : 0} </strong>
          {itemWord} left
        </span>
        <ul className="filters">
          {filters.map((filter) => (
            <li key={filter}>
              <TodoButton filter={filter} />
            </li>
          ))}
        </ul>
        {completedCount ? (
          <button
            style={{ cursor: "pointer" }}
            onClick={() => onClearCompleted()}
          >
            Clear Completed
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Filters;
