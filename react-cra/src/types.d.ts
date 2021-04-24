export interface UserInfo {
  id?: number;
  username: string;
  password: string;
}

export interface TodoDetails {
  id: number;
  userId: string;
  text: string;
}
