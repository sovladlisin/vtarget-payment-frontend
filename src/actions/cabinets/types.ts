export const GET_CABINETS = 'GET_CABINETS'
export const CREATE_CABINET = 'CREATE_CABINET'
export const UPDATE_CABINET_META = 'UPDATE_CABINET_META'
export const UPDATE_CABINET_PERMS = 'UPDATE_CABINET_PERMS'
export const DELETE_CABINET = 'DELETE_CABINET'

export const GET_VK_USER_INFO = 'GET_VK_USER_INFO'

export type TCabinet = {
    id?: number,
    account_id: number,
    name: string,
    spent?: number,
    balance?: number,
    status?: number,
    day_limit?: number,
    all_limit?: number,

    client_users: TCabinetUser[],
}

export type TCabinetUser = {
    vk_id: number,
    name: string,
    photo: string,
    role: number
}

interface ICreateCabinet {
    type: typeof CREATE_CABINET,
    payload: TCabinet
}
interface IGetCabinets {
    type: typeof GET_CABINETS,
    payload: TCabinet[]
}
interface IUpdateCabinetMeta {
    type: typeof UPDATE_CABINET_META,
    payload: { id: number, name: string, day_limit: number, all_limit: number }
}
interface IUpdateCabinetPerms {
    type: typeof UPDATE_CABINET_PERMS,
    payload: { id: number, permissions: TCabinetUser[] }
}
interface IDeleteCabinet {
    type: typeof DELETE_CABINET,
    payload: number
}
interface IGetUser {
    type: typeof GET_VK_USER_INFO,
    payload: { link: string, user: TCabinetUser }
}


export type TCabinetDispatchTypes = ICreateCabinet | IGetCabinets | IUpdateCabinetMeta | IDeleteCabinet | IGetUser | IUpdateCabinetPerms