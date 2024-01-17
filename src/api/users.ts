import { client } from "./fetchCli";
import { ResponceToken, serverResponse } from "../types/types";

export const getUsers = (page: number) => {
  return client.get<serverResponse>(`/users?page=${page}&count=6`);
};

export const getToken = () => {
  return client.get<ResponceToken>('/token');
}
