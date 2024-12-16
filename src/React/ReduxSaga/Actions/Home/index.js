import { REQUEST_HOME_MODULE_INFO } from './../../Constants'

export const requestHomeModuleInfo = () => {
    return {
        type: REQUEST_HOME_MODULE_INFO,
        payload: {}
    }
}