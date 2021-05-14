import {http1} from "./http";
import {FileModel} from "./myAxios";

export const loginRequest = (username: string, password: string) => {
  return http1.post("user/login", {username, password})
}

export const registerRequest = (username: string, password: string, type: number) => {
  return http1.post("user/register", {username, password, type})
}

export const updateUser = (file: FileModel, user: object) => {
  return http1.upload("user/update", file, {...user})
}

export const getUserInfo = () => {
  return http1.get("user/get")
}

export const getUserList = (type: number=2, pageNum: number=0) => {
  return http1.get("user/list", {type})
}

export const getChatMessageList = (them_id: string) => {
  return http1.get("msgList", {them_id})
}
