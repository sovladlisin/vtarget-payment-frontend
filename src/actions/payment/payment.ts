import axios from "axios"
import { Dispatch } from "react"
import { DEBUG, SERVER_URL } from "../../utils"
import { AlertDispatchTypes, CREATE_ALERT } from "../alerts/types"
import { withToken } from "../auth/login"
import { AuthDispatchTypes, CHANGE_WALLET } from "../auth/types"
import { TCabinetDispatchTypes, UPDATE_CLIENT_AMOUNT } from "../cabinets/types"
import { GET_PAYMENTS, INIT_PAYMENT, REFUND_PAYMENT, TPayment, TPaymentDispatchTypes } from "./types"

export const initPayment = (amount: number, is_wallet: 0 | 1, client_id: number, email: string) => (dispatch: Dispatch<TPaymentDispatchTypes | AlertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/cabinets/initPayment', JSON.stringify({ amount, is_wallet, client_id, email }), params).then(res => {
        window.location.replace(res.data.payment_url)
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'success', message: 'Платежная форма создана.' }
        })
    }).catch(err => {
        DEBUG && console.log(err)

        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'error', message: 'Возникла ошибка.' }
        })
    })
}
export const getPayments = () => (dispatch: Dispatch<TPaymentDispatchTypes | AlertDispatchTypes>) => {
    const params = withToken()
    axios.get(SERVER_URL + 'api/cabinets/getPayments', params).then(res => {
        dispatch({
            type: GET_PAYMENTS,
            payload: res.data
        })
    }).catch(err => {
        DEBUG && console.log(err)

        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'error', message: 'Возникла ошибка.' }
        })
    })
}
export const refundPayment = (order_id: string) => (dispatch: Dispatch<TPaymentDispatchTypes | AlertDispatchTypes | AuthDispatchTypes | TCabinetDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/cabinets/refundPayment', JSON.stringify({ order_id }), params).then(res => {
        dispatch({
            type: REFUND_PAYMENT,
            payload: res.data
        })
        // var amount = parseInt(order_id.split('_')[3])
        // var client_id = parseInt(order_id.split('_')[1])
        // var is_wallet = parseInt(order_id.split('_')[0])

        // if (is_wallet === 1) {
        //     dispatch({
        //         type: CHANGE_WALLET,
        //         payload: { is_adding: 0, amount }
        //     })
        // }
        // else {
        //     dispatch({
        //         type: UPDATE_CLIENT_AMOUNT,
        //         payload: { is_adding: 0, amount, client_id }
        //     })
        // }
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'success', message: 'Заявка на возврат средств была отправлена.' }
        })
    }).catch(err => {
        DEBUG && console.log(err)
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'error', message: 'Возникла ошибка.' }
        })
    })
}
