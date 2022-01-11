import axios from "axios";
import { TodoDetails } from "../types";

const apiClient = axios.create({ baseURL: "http://localhost:5000" });

const TodosService = {
  async postTodo(todo: Omit<TodoDetails, "id">) {
    const { data } = await apiClient.post("todos", todo);
    return { id: data.id, text: data.text };
  },
  async deleteTodo(todoId: number) {
    return apiClient.delete(`todos/${todoId}`);
  },
  async getTodos(userId: string) {
    const { data } = await apiClient.get(`todos?userId=${userId}`);
    return data.map(({ id, text }: TodoDetails) => ({ id, text }));
  },
};

export default TodosService;
