import {combineReducers} from "redux"
import {CHANGE_TAB, USER_UPDATE, USER_RESET} from "./action-types";


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
      return  Object.assign({}, preState, data)
    case USER_RESET:
    default:
      return preState
  }
}

export default combineReducers({
  tab,
  user
})
