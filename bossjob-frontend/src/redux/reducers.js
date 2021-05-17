import {combineReducers} from "redux"
import {CHANGE_TAB, USER_UPDATE, USER_RESET, RECEIVE_MESSAGE} from "./action-types";


function tab(preState, action) {
  const {type,data} = action
  switch (type) {
    case CHANGE_TAB:
      return data
    default:
      return "home"
  }
}

const initUser = {
  _id: '',
  username: '',
  type: 1,
  avatar: '',
  post: '',
  info: '',
  company: '',
  salary: ''
}
function user(preState=initUser, action) {
  const {type,data} = action
  switch (type) {
    case USER_UPDATE:
      return {...preState, ...data}//Object.assign({}, preState, data)
    case USER_RESET:
      return initUser
    default:
      return preState
  }
}

const initChat = []
function chat(preState=initChat, action) {
  const {type, data} = action
  switch (type) {
    case RECEIVE_MESSAGE:
      console.log("收到RECEIVE_MESSAGE消息", data)
      return preState
    default:
      return preState
  }
}

export default combineReducers({
  tab,
  user,
  chat
})
