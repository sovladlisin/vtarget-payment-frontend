import { Dispatch } from "react"
import { AlertDispatchTypes, CLEAR_ALERTS, CREATE_ALERT, TAlert } from "./types"


export const createAlert = (alert: TAlert) => (dispatch: Dispatch<AlertDispatchTypes>) => {
    dispatch({
        type: CREATE_ALERT,
        payload: alert
    })
}

export const clearAlerts = () => (dispatch: Dispatch<AlertDispatchTypes>) => {
    dispatch({
        type: CLEAR_ALERTS
    })
}