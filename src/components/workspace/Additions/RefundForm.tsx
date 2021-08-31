import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { refundPayment } from '../../../actions/payment/payment';
import { TPayment } from '../../../actions/payment/types';
import Login from '../../auth/Login';
import Register from '../../auth/Register';
import { useOnClickOutside } from '../../utils/HandleClickOutside';

interface IRefundFormProps {
    payment: TPayment,
    onClose: () => void
}

const RefundForm: React.FunctionComponent<IRefundFormProps> = (props) => {
    const dispatch = useDispatch()

    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(refundPayment(props.payment.order_id))
        props.onClose()
    }

    const [orderID, setOrderID] = React.useState('')

    return <>
        <div className={'m-background' + mobileClass}></div>
        <div className={'m-popup-container' + mobileClass} ref={ref}>
            <form onSubmit={onSubmit}>
                <span className={'m-popup-container-close' + mobileClass} onClick={_ => props.onClose()}><i className='fas fa-times'></i></span>
                <p className={'refund-title' + mobileClass}>Возврат средств</p>
                <p className={'refund-sub-title' + mobileClass}>№ Платежа: {props.payment.order_id}</p>

                <p className={'refund-decs' + mobileClass}>Для возврата средств введите номер платежа:</p>
                <input placeholder={'Номер платежа'} className={'refund-id-input' + mobileClass} required value={orderID} onChange={e => setOrderID(e.target.value)}></input>

                {orderID === props.payment.order_id ?
                    <button className={'refund-confirm' + mobileClass}>Подтвердить</button> :
                    <button className={'refund-confirm refund-confirm-false' + mobileClass}>Подтвердить</button>
                }
            </form>

            <button onClick={_ => props.onClose()} className={'refund-decline' + mobileClass}></button>

        </div>
    </>;
};

export default RefundForm;
