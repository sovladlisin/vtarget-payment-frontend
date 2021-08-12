import { AlertDispatchTypes, CLEAR_ALERTS, CREATE_ALERT } from "../../actions/alerts/types"
import { CREATE_CABINET, DELETE_CABINET, GET_CABINETS, GET_VK_USER_INFO, TCabinet, TCabinetDispatchTypes, TCabinetUser, UPDATE_CABINET_META, UPDATE_CABINET_PERMS } from "../../actions/cabinets/types"

interface IDefaultState {
    cabinets: TCabinet[],
    selected_vk_user: { link: string, user: TCabinetUser }
}

const DefaultState: IDefaultState = {
    cabinets: [],
    selected_vk_user: null
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
        case UPDATE_CABINET_META:
            return {
                ...state,
                cabinets: state.cabinets.map(c => c.id === action.payload.id ? { ...c, name: action.payload.name, day_limit: action.payload.day_limit, all_limit: action.payload.all_limit } : c)
            }
        case UPDATE_CABINET_PERMS:
            return {
                ...state,
                cabinets: state.cabinets.map(c => c.id === action.payload.id ? { ...c, client_users: action.payload.permissions } : c)
            }
        case GET_VK_USER_INFO:
            return {
                ...state,
                selected_vk_user: action.payload
            }
        default:
            return state
    }
}

