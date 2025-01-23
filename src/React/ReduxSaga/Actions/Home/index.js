import { CLEAR_ADD_OR_UPDATE_EVENT, REQUEST_HOME_MODULE_INFO, REQUEST_SAVE_OR_UPDATE_EVENT, REQUEST_UPDATE_STATUS_EVENT, REQUEST_USER_LOGIN } from './../../Constants'

export const requestUserLogin = (user) => {
    return {
        type: REQUEST_USER_LOGIN,
        payload: {
            user
        }
    }
}
export const requestHomeModuleInfo = (request) => {
    return {
        type: REQUEST_HOME_MODULE_INFO,
        payload: {
            request
        }
    }
}
export const requestSaveOrUpdateEvent = (request) => {
    return {
        type: REQUEST_SAVE_OR_UPDATE_EVENT,
        payload: {
            request
        }
    }
}

export const requestUpdateStatusEvent = (request) => {
    return {
        type: REQUEST_UPDATE_STATUS_EVENT,
        payload: {
            request
        }
    }
}

export const requestClearSaveOrUpdateEvent = () => {
    return {
        type: CLEAR_ADD_OR_UPDATE_EVENT,
        payload: {}
    }
}