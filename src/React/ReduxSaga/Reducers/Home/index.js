import {
    RESPONSE_HOME_MODULE_INFO,
    RESPONSE_SAVE_OR_UPDATE_EVENT,
    RESPONSE_USER_LOGIN,
} from '../../Constants'


export default function home(state = {}, action) {
    switch (action.type) {
        case RESPONSE_USER_LOGIN:
            {
                const responseService = action.payload.response;
                if (responseService.code === 200) {
                    const usuario = responseService
                    return { ...state, errorLoginService: false, usuario }
                }
                else {
                    return { ...state, errorLoginService: true }
                }


            }
        case RESPONSE_HOME_MODULE_INFO:
            {
                const responseHomeModule = action.payload.response;
                if (responseHomeModule.code === 200) {
                    const eventosCM = responseHomeModule
                    return { ...state, errorLoadHomeModule: false, eventosCM }
                }
                else {
                    return { ...state, errorLoadHomeModule: true }
                }
            }
        case RESPONSE_SAVE_OR_UPDATE_EVENT:
            {
                const responseService = action.payload.response;
                if (responseService.code === 200) {
                    const service = responseService
                    return { ...state, errorEventResponse: false, service }
                }
                else {
                    return { ...state, errorEventResponse: true }
                }
            }
        default:
            return { ...state }
    }
}