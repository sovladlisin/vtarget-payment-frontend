import { AlertDispatchTypes, CLEAR_ALERTS, CREATE_ALERT } from "../../actions/alerts/types"

interface IDefaultState {
    message: string | null
}

const DefaultState: IDefaultState = {
    message: null
}

export const alertsReducer = (state: IDefaultState = DefaultState, action: AlertDispatchTypes): IDefaultState => {
    switch (action.type) {
        case CREATE_ALERT:
            return {
                message: action.payload
            }
        case CLEAR_ALERTS:
            console.log('qwer')
            return {
                ...state,
                message: null
            }

        default:
            return state
    }
}

