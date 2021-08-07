import { AlertDispatchTypes, CLEAR_ALERTS, CREATE_ALERT, TAlert } from "../../actions/alerts/types"

interface IDefaultState {
    alerts: TAlert[]
}

const DefaultState: IDefaultState = {
    alerts: []
}

export const alertsReducer = (state: IDefaultState = DefaultState, action: AlertDispatchTypes): IDefaultState => {
    switch (action.type) {
        case CREATE_ALERT:
            return {
                alerts: [...state.alerts, action.payload]
            }
        case CLEAR_ALERTS:
            return {
                ...state,
                alerts: []
            }

        default:
            return state
    }
}

