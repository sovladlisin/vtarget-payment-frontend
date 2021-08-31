import { AuthDispatchTypes, CHANGE_WALLET, GET_ALL_USERS, GET_USER_MEDALS, LOGIN, LOGOUT, TUser, UPDATE_VK_PROFILE } from "../../actions/auth/types";
import { URL } from "../../utils";

interface IDefaultState {


    user: TUser,

}
const defaultState: IDefaultState = {
    user: {
        token: '',
        email: '',
        username: '',
        is_admin: false,
        is_online: false,
        vk_profile: null,
        wallet: 0
    }

}

const authReducer = (state: IDefaultState = defaultState, action: AuthDispatchTypes): IDefaultState => {
    switch (action.type) {
        // case PHOTO_BAN_USER:
        //     if (action.payload < 0) {
        //         var id = action.payload * -1
        //         return {
        //             ...state,
        //             photoDownloadRecords: state.photoDownloadRecords.map(r => r.user.id === id ? { ...r, user: { ...r.user, date_shutter_banned: '2011-10-10T14:48​:00' } } : r)
        //         }
        //     }
        //     else {
        //         var id = action.payload
        //         return {
        //             ...state,
        //             photoDownloadRecords: state.photoDownloadRecords.map(r => r.user.id === id ? { ...r, user: { ...r.user, date_shutter_banned: '2033-10-10T14:48​:00' } } : r)
        //         }
        //     }


        case UPDATE_VK_PROFILE:
            return {
                ...state,
                user: { ...state.user, vk_profile: action.payload }
            }

        case LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT:
            window.location.replace(URL);
            return defaultState

        case CHANGE_WALLET:
            return {
                ...state,
                user: { ...state.user, wallet: action.payload.is_adding === 0 ? state.user.wallet - action.payload.amount : state.user.wallet + action.payload.amount }
            }
        default:
            return state;
    }
}

export default authReducer