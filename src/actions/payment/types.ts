export const INIT_PAYMENT = 'INIT_PAYMENT'
export const GET_PAYMENTS = 'GET_PAYMENTS'
export const REFUND_PAYMENT = 'REFUND_PAYMENT'


export const PAYMENT_TYPES: { [type: string]: { message: string, color: string } } = {
    'CONFIRMED': { message: 'Выполнено', color: 'bg-green color-deep-green' },
    'REFUNDED': { message: 'Возвращено', color: 'bg-green color-deep-green' },
    'NEW': { message: 'Создано', color: 'bg-light-blue color-deep-blue' },
    'FORM_SHOWED': { message: 'Платежная форма открыта покупателем', color: 'bg-light-blue color-deep-blue' },
    'DEADLINE_EXPIRED': { message: 'Просрочено', color: 'bg-red color-deep-red' },
    'CANCELED': { message: 'Отменено', color: 'bg-red color-deep-red' },
    'PREAUTHORIZING': { message: 'Проверка', color: 'bg-light-blue color-deep-blue' },
    'AUTHORIZING': { message: 'Резервируется', color: 'bg-light-blue color-deep-blue' },
    'AUTHORIZED': { message: 'Зарезервирован', color: 'bg-light-blue color-deep-blue' },
    'AUTH_FAIL': { message: 'Не прошел авторизацию', color: 'bg-red color-deep-red' },
    'REJECTED': { message: 'Отклонен', color: 'bg-red color-deep-red' },
    '3DS_CHECKED': { message: 'Проверен по протоколу 3-D Secure', color: 'bg-light-blue color-deep-blue' },
    '3DS_CHECKING': { message: 'Проверяется по протоколу 3-D Secure', color: 'bg-light-blue color-deep-blue' },
    'REVERSING': { message: 'Резервирование отменяется', color: 'bg-light-blue color-deep-blue' },
    'PARTIAL_REVERSED': { message: 'Резервирование отменено частично', color: 'bg-light-blue color-deep-blue' },
    'REVERSED': { message: 'Резервирование отменено', color: 'bg-red color-deep-red' },
    'CONFIRMING': { message: 'Подтверждается', color: 'bg-light-blue color-deep-blue' },
    'REFUNDING': { message: 'Возвращается', color: 'bg-light-blue color-deep-blue' },
    'PARTIAL_REFUNDED': { message: 'Возвращен частично', color: 'bg-green color-deep-green' },
}

export type TPayment = {
    id?: number,
    status: string,
    terminal_key: string,
    payment_id: string,
    order_id: string,
    amount: number,
    payment_url: string,
    is_wallet: 0 | 1,

    is_processed: boolean,
    is_hidden: boolean,
    is_refunded: boolean

    user: number,

    date: string
}

interface IInitPayment {
    type: typeof INIT_PAYMENT,
    payload: TPayment
}
interface IGetPayments {
    type: typeof GET_PAYMENTS,
    payload: TPayment[]
}
interface IRefundPayment {
    type: typeof REFUND_PAYMENT,
    payload: TPayment
}


export type TPaymentDispatchTypes = IInitPayment | IGetPayments | IRefundPayment