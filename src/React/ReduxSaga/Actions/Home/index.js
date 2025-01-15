import { REQUEST_HOME_MODULE_INFO, REQUEST_SAVE_OR_UPDATE_EVENT, REQUEST_USER_LOGIN } from './../../Constants'

export const requestUserLogin = (user) => {
    return {
        type: REQUEST_USER_LOGIN,
        payload: {
            user
        }
    }
}
export const requestHomeModuleInfo = (guid) => {
    return {
        type: REQUEST_HOME_MODULE_INFO,
        payload: {
            guid
        }
    }
}
export const requestSaveOrUpdateEvent = (event) => {
    return {
        type: REQUEST_SAVE_OR_UPDATE_EVENT,
        payload: {
            event
        }
    }
}