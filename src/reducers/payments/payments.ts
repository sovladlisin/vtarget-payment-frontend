import { INIT_PAYMENT, TPayment, TPaymentDispatchTypes } from "../../actions/payment/types"

interface IDefaultState {
    payments: TPayment[]
}

const DefaultState: IDefaultState = {
    payments: []
}

export const paymentReducer = (state: IDefaultState = DefaultState, action: TPaymentDispatchTypes): IDefaultState => {
    switch (action.type) {
        case INIT_PAYMENT:
            console.log(action.payload)
            return {
                ...state,
                payments: [...state.payments, action.payload]
            }
        default:
            return state
    }
}

