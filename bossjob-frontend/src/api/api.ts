import {http1} from "./http";
import {FileModel} from "./myAxios";

export const loginRequest = (username: string, password: string) => {
  return http1.post("users/login", {username, password})
}

export const registerRequest = (username: string, password: string, type: number) => {
  return http1.post("users/register", {username, password, type})
}

export const updateUser = (file: FileModel, info: string) => {
  return http1.upload("user/update", file, {info})
}
