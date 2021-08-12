import { ICreateAlert } from "../alerts/types"

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const GET_ALL_USERS = 'GET_ALL_USERS'
export const GET_USER_MEDALS = 'GET_USER_MEDALS'

export const UPDATE_VK_PROFILE = 'UPDATE_VK_PROFILE'

export type TUser = {
    email: string,
    username: string,
    token: string,
    is_online: boolean,
    is_admin: boolean,
    id?: number,

    vk_profile?: TVkProfile
}

export type TVkProfile = {
    photo: string,
    name: string,
    vk_id: number,
}



interface ILogin {
    type: typeof LOGIN
    payload: TUser
}

interface ILogout {
    type: typeof LOGOUT
}

interface IUpdateVkProfile {
    type: typeof UPDATE_VK_PROFILE,
    payload: TVkProfile
}

// ------------------
interface IGetAllUsers {
    type: typeof GET_ALL_USERS,
    payload: TUser[]
}

export type AuthDispatchTypes = IGetAllUsers |
    ILogin | ILogout | ICreateAlert | IUpdateVkProfile