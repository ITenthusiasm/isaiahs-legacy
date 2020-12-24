import axios from "axios";
import { UserInfo } from "../types";

const apiClient = axios.create({ baseURL: "http://localhost:5000" });

const UserService = {
  async postUser(userInfo: UserInfo) {
    const { data } = await apiClient.post("users", userInfo);
    return { id: data.id, name: data.username };
  },
  async getUser(userInfo: UserInfo) {
    const { data } = await apiClient.get(
      `users?username=${userInfo.username}&password=${userInfo.password}`
    );
    const [user] = data;

    if (!user) return undefined;

    return { id: user.id, name: user.username };
  },
  async userExists(username: string) {
    const { data } = await apiClient.get(`users?username=${username}`);
    return data.length > 0;
  },
};

export default UserService;
