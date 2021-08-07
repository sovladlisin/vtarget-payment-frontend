import { Dispatch } from "react"
import { CREATE_CABINET, DELETE_CABINET, GET_CABINETS, TCabinet, TCabinetDispatchTypes, TCabinetUser, UPDATE_CABINET } from "./types"


export const getCabinets = () => (dispatch: Dispatch<TCabinetDispatchTypes>) => {
    const sampleTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'

    const dummyCabinets: TCabinet[] = [
        { id: 1, account_id: 1, name: sampleTitle, spent: 53, balance: 539, admin_id: 1, status: 1, day_limit: 1, all_limit: 1, user_accounts: [] },
        { id: 2, account_id: 1, name: sampleTitle, spent: 573, balance: 5391, admin_id: 1, status: 2, day_limit: 1, all_limit: 1, user_accounts: [] },
        { id: 3, account_id: 1, name: sampleTitle, spent: 5973, balance: 5391, admin_id: 1, status: 1, day_limit: 1, all_limit: 1, user_accounts: [] },
        { id: 4, account_id: 1, name: sampleTitle, spent: 59773, balance: 539113, admin_id: 1, status: 1, day_limit: 1, all_limit: 1, user_accounts: [] },
        { id: 5, account_id: 1, name: sampleTitle, spent: 571, balance: 5391, admin_id: 1, status: 2, day_limit: 1, all_limit: 1, user_accounts: [] },
        { id: 6, account_id: 1, name: sampleTitle, spent: 5973, balance: 53911, admin_id: 1, status: 1, day_limit: 1, all_limit: 1, user_accounts: [] },
        { id: 7, account_id: 1, name: sampleTitle, spent: 59773, balance: 5397113, admin_id: 1, status: 0, day_limit: 1, all_limit: 1, user_accounts: [] },
        { id: 8, account_id: 1, name: sampleTitle, spent: 5973, balance: 5339113, admin_id: 1, status: 1, day_limit: 1, all_limit: 1, user_accounts: [] },
        { id: 9, account_id: 1, name: sampleTitle, spent: 597773, balance: 53914413, admin_id: 1, status: 0, day_limit: 1, all_limit: 1, user_accounts: [] },
    ]

    dispatch({
        type: GET_CABINETS,
        payload: dummyCabinets
    })
}

export const createCabinet = (cabinet: TCabinet) => (dispatch: Dispatch<TCabinetDispatchTypes>) => {
    dispatch({
        type: CREATE_CABINET,
        payload: cabinet
    })
}
export const updateCabinet = (cabinet: TCabinet) => (dispatch: Dispatch<TCabinetDispatchTypes>) => {
    dispatch({
        type: UPDATE_CABINET,
        payload: cabinet
    })
}
export const deleteCabinet = (id: number) => (dispatch: Dispatch<TCabinetDispatchTypes>) => {
    dispatch({
        type: DELETE_CABINET,
        payload: id
    })
}