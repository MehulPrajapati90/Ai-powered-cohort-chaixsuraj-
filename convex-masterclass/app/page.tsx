import CreateTodo from "@/components/create-todo";
import TodoList from "@/components/todo-list";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 py-10 px-10">
      <CreateTodo />
      <TodoList />
    </div>
  );
}