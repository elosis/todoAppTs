import { createContext, useContext, useState, useMemo } from "react";

export interface Todo {
  todo: string;
  id: number;
  isCompleted: boolean;
}

interface TodoData {
  todo: Todo;
  setTodo: React.Dispatch<React.SetStateAction<Todo>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: any;
  setFilter: React.Dispatch<any>;
}

interface ContextValue {
  todoData: TodoData;
  handleAddTodo: (todo: string) => void;
  filteredTodos: Todo[];
  handleChangeItem: (id: number) => void;
  handleRemove: (id: number) => void;
  completeAll: () => void;
  getActiveCount: () => number;
  onClearCompleted: () => void;
  getCompletedCount: () => number;
  onFilter: (filter: string) => void;
}

const defaultValue: TodoData = {
  todo: { todo: "", id: 0, isCompleted: false },
  setTodo: () => {},
  todos: [],
  setTodos: () => {},
  filter: null,
  setFilter: () => {},
};

const TodoContext = createContext<ContextValue>({
  todoData: defaultValue,
  handleAddTodo: () => {},
  filteredTodos: [],
  handleChangeItem: () => {},
  handleRemove: () => {},
  completeAll: () => {},
  getActiveCount: () => 0,
  onClearCompleted: () => {},
  getCompletedCount: () => 0,
  onFilter: () => {},
});

function TodoLayer(props: React.PropsWithChildren<{}>) {
  const [todo, setTodo] = useState<Todo>({
    todo: "",
    id: 0,
    isCompleted: false,
  });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<any>(null);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "All":
        return todos;
      case "Completed":
        return todos.filter((todo) => todo.isCompleted);
      case "Active":
        return todos.filter((todo) => !todo.isCompleted);
      default:
        return todos;
    }
  }, [filter, todos]);

  const handleAddTodo = (todo: string) => {
    const newTodo: Todo = {
      todo,
      id: Date.now(),
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleChangeItem = (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].isCompleted = !todos[index].isCompleted;
    setTodos(todos.map((todo) => ({ ...todo })));
  };

  const handleRemove = (id: number) => {
    const newList = todos.filter((todo) => todo.id !== id);
    setTodos(newList);
  };

  const completeAll = () => {
    const tempTodos = todos.map((todo) => todo);
    tempTodos.forEach((todo) => (todo.isCompleted = true));
    setTodos(tempTodos);
  };

  const getActiveCount = (): number => {
    return todos.reduce(
      (count, todo) => (!todo.isCompleted ? count + 1 : count),
      0
    );
  };

  const getCompletedCount = (): number => {
    return todos.reduce(
      (count, todo) => (todo.isCompleted ? count + 1 : count),
      0
    );
  };

  const onClearCompleted = () => {
    const activeTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(activeTodos);
    setFilter("");
  };

  const onFilter = (filter: string) => {
    setFilter(filter);
  };

  const todoData: TodoData = {
    todo,
    setTodo,
    todos,
    setTodos,
    filter,
    setFilter,
  };

  const data: ContextValue = {
    todoData,
    handleAddTodo: () => handleAddTodo(todo.todo),
    filteredTodos,
    getActiveCount,
    getCompletedCount,
    onClearCompleted,
    handleChangeItem,
    handleRemove,
    completeAll,
    onFilter,
  };

  return (
    <TodoContext.Provider value={data}>{props.children}</TodoContext.Provider>
  );
}

export { TodoContext, TodoLayer, useContext };
