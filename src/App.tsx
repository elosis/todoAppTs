import React from "react";
import "./App.css";
import InputField from "./components/InputField";
import { TodoLayer } from "./stores/context";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";

function App() {
  return (
    <TodoLayer>
      <div className="App">
        <span className="todos_head">todos</span>
        <InputField />
        <TodoList />
        <Filters />
      </div>
    </TodoLayer>
  );
}

export default App;
