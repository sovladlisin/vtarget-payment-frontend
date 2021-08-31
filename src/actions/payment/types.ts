export const INIT_PAYMENT = 'INIT_PAYMENT'

export type TPayment = {
    status: string,
    terminal_key: string,
    payment_id: string,
    order_id: string,
    amount: number,
    payment_url: string,
    is_wallet: 0 | 1,
    user: number
}

interface IInitPayment {
    type: typeof INIT_PAYMENT,
    payload: TPayment
}

export type TPaymentDispatchTypes = IInitPayment