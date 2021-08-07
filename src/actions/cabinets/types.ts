export const GET_CABINETS = 'GET_CABINETS'
export const CREATE_CABINET = 'CREATE_CABINET'
export const UPDATE_CABINET = 'UPDATE_CABINET'
export const DELETE_CABINET = 'DELETE_CABINET'


export type TCabinet = {
    id?: number,
    account_id: number,
    name: string,
    spent?: number,
    balance?: number,
    admin_id: number,
    status?: number,
    day_limit?: number,
    all_limit?: number,

    user_accounts: TCabinetUser[],
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
interface IUpdateCabinet {
    type: typeof UPDATE_CABINET,
    payload: TCabinet
}
interface IDeleteCabinet {
    type: typeof DELETE_CABINET,
    payload: number
}


export type TCabinetDispatchTypes = ICreateCabinet | IGetCabinets | IUpdateCabinet | IDeleteCabinet