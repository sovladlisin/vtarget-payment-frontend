import { Dispatch } from "react"
import { AlertDispatchTypes, CLEAR_ALERTS, CREATE_ALERT } from "./types"


export const createAlert = (message: string) => (dispatch: Dispatch<AlertDispatchTypes>) => {
    dispatch({
        type: CREATE_ALERT,
        payload: message
    })
}

export const clearAlerts = () => (dispatch: Dispatch<AlertDispatchTypes>) => {
    dispatch({
        type: CLEAR_ALERTS
    })
}