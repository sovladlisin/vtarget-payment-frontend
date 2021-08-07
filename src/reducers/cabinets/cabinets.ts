import { AlertDispatchTypes, CLEAR_ALERTS, CREATE_ALERT } from "../../actions/alerts/types"
import { CREATE_CABINET, DELETE_CABINET, GET_CABINETS, TCabinet, TCabinetDispatchTypes, UPDATE_CABINET } from "../../actions/cabinets/types"

interface IDefaultState {
    cabinets: TCabinet[]
}

const DefaultState: IDefaultState = {
    cabinets: []
}

export const cabinetReducer = (state: IDefaultState = DefaultState, action: TCabinetDispatchTypes): IDefaultState => {
    switch (action.type) {
        case CREATE_CABINET:
            return {
                ...state,
                cabinets: [...state.cabinets, action.payload]
            }
        case GET_CABINETS:
            return {
                ...state,
                cabinets: action.payload
            }
        case DELETE_CABINET:
            return {
                ...state,
                cabinets: state.cabinets.filter(c => c.id != action.payload)
            }
        case UPDATE_CABINET:
            return {
                ...state,
                cabinets: state.cabinets.map(c => c.id === action.payload.id ? action.payload : c)
            }
        default:
            return state
    }
}

