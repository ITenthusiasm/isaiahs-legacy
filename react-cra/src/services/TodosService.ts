import axios from "axios";
import { TodoDetails } from "../types";

const apiClient = axios.create({ baseURL: "http://localhost:5000" });

const TodosService = {
  async postTodo(todo: TodoDetails) {
    const { data } = await apiClient.post("todos", todo);
    return data.text;
  },
  async getTodos(userId: string) {
    const { data } = await apiClient.get(`todos?userId=${userId}`);
    return data.map(({ text }: TodoDetails) => text);
  },
};

export default TodosService;
