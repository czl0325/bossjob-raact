import {combineReducers} from "redux"
import {CHANGE_TAB, USER_UPDATE, USER_RESET, RECEIVE_MESSAGE, RECEIVE_MESSAGE_LIST} from "./action-types";


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

const initChat = {}
function chat(preState=initChat, action) {
  const {type, data} = action
  switch (type) {
    case RECEIVE_MESSAGE_LIST:
      const newState1 = {...preState}
      if (Array.isArray(data) && data.length > 0) {
        const chat = data[0]
        newState1[chat.chat_id] = data
      }
      return newState1
    case RECEIVE_MESSAGE:
      const newState2 = {...preState}
      if (typeof data === 'object' && data.chat_id) {
        newState2[data.chat_id] = [...newState2[data.chat_id], data]
      }
      return newState2
    default:
      return preState
  }
}

export default combineReducers({
  tab,
  user,
  chat
})
