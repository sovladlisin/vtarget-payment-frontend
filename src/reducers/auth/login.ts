import { ACCEPT_SERVICE_REQUEST, ACTIVATE_PHOTOSTOCK_ACCOUNT, APPLY_SERVICE_REQUEST, AuthDispatchTypes, CONNECT_SHUTTERSTOCK_TOKEN, CREATE_PHOTOSTOCK_ACCOUNT, DELETE_PHOTOSTOCK_ACCOUNT, DENY_SERVICE_REQUEST, DISCONNECT_SHUTTERSTOCK_TOKEN, EDIT_PHOTOSTOCK_ACCOUNT, EDIT_SERVICE_INFO, GET_ALL_USERS, GET_PHOTOSTOCK_ACCOUNTS, GET_PHOTO_DOWNLOAD_RECORDS, GET_SERVICE_INFO, GET_SERVICE_REQUESTS, GET_USER_MEDALS, LOGIN, LOGOUT, PHOTO_BAN_USER, SHUTTERSTOCK_TOKEN_CHECK, TOGGLE_USER_ADMIN_ROLE, TPhotoDownloadRecord, TPhotostockAccount, TServiceInfo, TServiceRequest, TUser } from "../../actions/auth/types";
import { URL } from "../../utils";

interface IDefaultState {


    user: TUser,

}
const defaultState: IDefaultState = {
    user: {
        id: -1,
        user_id: -1,
        token: false,
        user_img: '',
        user_name: 'Ошибка входа',
        is_admin: false,
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




        case LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT:
            window.location.replace(URL);
            return defaultState


        default:
            return state;
    }
}

export default authReducer