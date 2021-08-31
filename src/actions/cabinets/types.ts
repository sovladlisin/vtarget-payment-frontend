export const GET_CABINETS = 'GET_CABINETS'
export const CREATE_CABINET = 'CREATE_CABINET'
export const UPDATE_CABINET_META = 'UPDATE_CABINET_META'
export const UPDATE_CABINET_PERMS = 'UPDATE_CABINET_PERMS'
export const DELETE_CABINET = 'DELETE_CABINET'

export const GET_VK_USER_INFO = 'GET_VK_USER_INFO'

export const TRANSFER_WITH_WALLET = 'TRANSFER_WITH_WALLET'
export const TRANSWER_WITH_CLIENTS = 'TRANSWER_WITH_CLIENTS'

export const UPDATE_CLIENT_AMOUNT = 'UPDATE_CLIENT_AMOUNT'

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
interface ITransferWithWallet {
    type: typeof TRANSFER_WITH_WALLET
    payload: { is_adding: number, client_id: number, amount: number }
}
interface ITransferWithClients {
    type: typeof TRANSWER_WITH_CLIENTS
    payload: { client_id_from: number, client_id_to: number, amount: number }
}
interface IUpdateClientAmount {
    type: typeof UPDATE_CLIENT_AMOUNT,
    payload: { client_id: number, is_adding: 0 | 1, amount: number }
}

export type TCabinetDispatchTypes = IUpdateClientAmount | ICreateCabinet | IGetCabinets | IUpdateCabinetMeta | IDeleteCabinet | IGetUser | IUpdateCabinetPerms | ITransferWithClients | ITransferWithWallet