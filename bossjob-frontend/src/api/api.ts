import {http1} from "./http";

export const loginRequest = (username: string, password: string) => {
  return http1.post("users/login", {username, password})
}

export const registerRequest = (username: string, password: string, type: number) => {
  return http1.post("users/register", {username, password, type})
}
