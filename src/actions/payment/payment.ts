import axios from "axios"
import { Dispatch } from "react"
import { SERVER_URL } from "../../utils"
import { AlertDispatchTypes, CREATE_ALERT } from "../alerts/types"
import { withToken } from "../auth/login"
import { INIT_PAYMENT, TPaymentDispatchTypes } from "./types"

export const initPayment = (amount: number, is_wallet: 0 | 1, client_id: number, email: string) => (dispatch: Dispatch<TPaymentDispatchTypes | AlertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/cabinets/initPayment', JSON.stringify({ amount, is_wallet, client_id, email }), params).then(res => {
        window.location.replace(res.data.payment_url)
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'success', message: 'Платежная форма создана.' }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 'error', message: 'Возникла ошибка.' }
        })
    })
}