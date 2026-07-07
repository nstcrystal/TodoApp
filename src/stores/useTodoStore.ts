import { defineStore } from "pinia";
import { reactive, watch } from "vue";

export interface Todo {
  id: number;
  title: string;
  isDone: boolean; 
}

export const useTodoStore = defineStore("todo", () => {
  const STORAGE_KEY = "vue-todos";

  const savedTodos = localStorage.getItem(STORAGE_KEY);
  const initialTodos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];

  const todos = reactive<Todo[]>(initialTodos);

  watch(
    todos,
    (newTodos) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    },
    { deep: true }
  );

  function getID(): number {
    let max = -1;

    for (const item of todos) {
      if (max < item.id) {
        max = item.id;
      }
    }

    return max + 1;
  }

  function addTodo(title: string) {
    const newTodo: Todo = { id: getID(), title, isDone: false };
    todos.push(newTodo);
  }

  function updateTodo(id: number, title: string, isDone: boolean) {
    for (const item of todos) {
      if (item.id == id) {
        item.title = title;
        item.isDone = isDone;
        break;
      }
    }
  }

  function deleteTodo(id: number) {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == id) {
        [todos[i], todos[todos.length - 1]] = [
          todos[todos.length - 1],
          todos[i],
        ];
        todos.pop();
        break;
      }
    }
  }

  return { todos, addTodo, updateTodo, deleteTodo };
});
