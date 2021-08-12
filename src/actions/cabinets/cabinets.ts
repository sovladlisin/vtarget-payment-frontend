import axios from "axios"
import { Dispatch } from "react"
import { SERVER_URL } from "../../utils"
import { AlertDispatchTypes, CREATE_ALERT } from "../alerts/types"
import { withToken } from "../auth/login"
import { CREATE_CABINET, DELETE_CABINET, GET_CABINETS, GET_VK_USER_INFO, TCabinet, TCabinetDispatchTypes, TCabinetUser, UPDATE_CABINET_META, UPDATE_CABINET_PERMS } from "./types"


export const getCabinets = () => (dispatch: Dispatch<TCabinetDispatchTypes | AlertDispatchTypes>) => {
    const sampleTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'

    // const dummyCabinets: TCabinet[] = [
    //     { id: 1, account_id: 1, name: sampleTitle, spent: 53, balance: 539, admin_id: 1, status: 1, day_limit: 1, all_limit: 1, user_accounts: [] },
    //     { id: 2, account_id: 1, name: sampleTitle, spent: 573, balance: 5391, admin_id: 1, status: 2, day_limit: 1, all_limit: 1, user_accounts: [] },
    //     { id: 3, account_id: 1, name: sampleTitle, spent: 5973, balance: 5391, admin_id: 1, status: 1, day_limit: 1, all_limit: 1, user_accounts: [] },
    //     { id: 4, account_id: 1, name: sampleTitle, spent: 59773, balance: 539113, admin_id: 1, status: 1, day_limit: 1, all_limit: 1, user_accounts: [] },
    //     { id: 5, account_id: 1, name: sampleTitle, spent: 571, balance: 5391, admin_id: 1, status: 2, day_limit: 1, all_limit: 1, user_accounts: [] },
    //     { id: 6, account_id: 1, name: sampleTitle, spent: 5973, balance: 53911, admin_id: 1, status: 1, day_limit: 1, all_limit: 1, user_accounts: [] },
    //     { id: 7, account_id: 1, name: sampleTitle, spent: 59773, balance: 5397113, admin_id: 1, status: 0, day_limit: 1, all_limit: 1, user_accounts: [] },
    //     { id: 8, account_id: 1, name: sampleTitle, spent: 5973, balance: 5339113, admin_id: 1, status: 1, day_limit: 1, all_limit: 1, user_accounts: [] },
    //     { id: 9, account_id: 1, name: sampleTitle, spent: 597773, balance: 53914413, admin_id: 1, status: 0, day_limit: 1, all_limit: 1, user_accounts: [] },
    // ]

    const params = withToken()
    axios.get(SERVER_URL + 'api/cabinets/getClients', params).then(res => {
        dispatch({
            type: GET_CABINETS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'error', message: 'Возникла ошибка.' }
        })
    })


}

export const createCabinet = (name: string, day_limit: number, all_limit: number) => (dispatch: Dispatch<TCabinetDispatchTypes | AlertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/cabinets/createClient', JSON.stringify({ name, day_limit, all_limit }), params).then(res => {
        dispatch({
            type: CREATE_CABINET,
            payload: res.data
        })
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'success', message: 'Кабинет успешно создан.' }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'error', message: 'Возникла ошибка.' }
        })
    })
}
export const updateCabinetMeta = (id: number, name: string, day_limit: number, all_limit: number) => (dispatch: Dispatch<TCabinetDispatchTypes | AlertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/cabinets/updateClientMeta', JSON.stringify({ name, day_limit, all_limit, id }), params).then(res => {
        dispatch({
            type: UPDATE_CABINET_META,
            payload: { id, name, day_limit, all_limit }
        })
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'success', message: 'Кабинет успешно обновлен.' }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'error', message: 'Возникла ошибка.' }
        })
    })
}
export const updateCabinetPermissions = (id: number, permissions: TCabinetUser[]) => (dispatch: Dispatch<TCabinetDispatchTypes | AlertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/cabinets/updateClientPermissions', JSON.stringify({ id, permissions }), params).then(res => {
        dispatch({
            type: UPDATE_CABINET_PERMS,
            payload: { id, permissions }
        })
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'success', message: 'Кабинет успешно обновлен.' }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'error', message: 'Возникла ошибка.' }
        })
    })
}
export const deleteCabinet = (id: number) => (dispatch: Dispatch<TCabinetDispatchTypes | AlertDispatchTypes>) => {
    const params = withToken({ id })
    axios.delete(SERVER_URL + 'api/cabinets/deleteClient', params).then(res => {
        dispatch({
            type: DELETE_CABINET,
            payload: id
        })
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'success', message: 'Кабинет успешно удален.' }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'error', message: 'Возникла ошибка.' }
        })
    })
}

export const getUserInfo = (id: string) => (dispatch: Dispatch<TCabinetDispatchTypes | AlertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/cabinets/getVkUserInfo', JSON.stringify({ user_id: id }), params).then(res => {
        dispatch({
            type: GET_VK_USER_INFO,
            payload: { link: id, user: res.data }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'error', message: 'Возникла ошибка.' }
        })
    })
}