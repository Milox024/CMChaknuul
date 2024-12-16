import {
    RESPONSE_HOME_MODULE_INFO,
} from '../../Constants'


export default function home(state = {}, action) {
    switch (action.type) {
        case RESPONSE_HOME_MODULE_INFO:
            {
                const responseHomeModule = action.payload.response;
                console.log("Reducers Home")
                console.log(responseHomeModule);
                if (responseHomeModule.code === 100) {
                    const homeModuleEs = responseHomeModule
                    return { ...state, errorLoadHomeModule: false, homeModuleEs }
                }
                else {
                    return { ...state, errorLoadHomeModule: true }
                }


            }
        default:
            return { ...state }
    }
}