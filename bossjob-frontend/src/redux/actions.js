import {CHANGE_TAB, USER_UPDATE, USER_RESET, SEND_MESSAGE, RECEIVE_MESSAGE} from "./action-types";
import BossSocket from '../utils/socket'

export const createTabAction = tab => ({type: CHANGE_TAB, data: tab})

export const createUpdateUserAction = user => ({type: USER_UPDATE, data: user})

export const createResetUserAction = () => ({type: USER_RESET})

export const createSendMessageAction = ({from_id, to_id, content}) => {
  return dispatch => {
    BossSocket.getInstance().sendMessage({from_id, to_id, content})
    //dispatch(createReceiveMessageAction(null))
  }
}

export const createReceiveMessageAction = (chat) => ({type: RECEIVE_MESSAGE, data: chat})
