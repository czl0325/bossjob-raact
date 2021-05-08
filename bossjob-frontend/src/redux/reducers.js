import {combineReducers} from "redux"
import {CHANGE_TAB} from "./action-types";


function tab(preState, action) {
  const {type,data} = action
  switch (type) {
    case CHANGE_TAB:
      return data
    default:
      return "home"
  }
}


export default combineReducers({
  tab
})
