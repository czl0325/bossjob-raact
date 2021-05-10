import {CHANGE_TAB, USER_UPDATE, USER_RESET} from "./action-types";

export const createTabAction = tab => ({type: CHANGE_TAB, data: tab})

export const createUpdateUserAction = user => ({type: USER_UPDATE, data: user})

export const createResetUserAction = () => ({type: USER_RESET, data: {}})
