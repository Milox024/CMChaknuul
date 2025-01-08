import { REQUEST_HOME_MODULE_INFO, REQUEST_USER_LOGIN } from './../../Constants'

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