export const CREATE_ALERT = 'CREATE_ALERT'
export const CLEAR_ALERTS = 'CLEAR_ALERTS'

export interface IClearAlerts {
    type: typeof CLEAR_ALERTS
}

export interface ICreateAlert {
    type: typeof CREATE_ALERT,
    payload: string
}

export type AlertDispatchTypes = ICreateAlert | IClearAlerts