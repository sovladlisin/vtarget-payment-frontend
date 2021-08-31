import * as React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from '../../../actions/alerts/alerts';
import { TCabinet } from '../../../actions/cabinets/types';
import { initPayment } from '../../../actions/payment/payment';
import { RootStore } from '../../../store';
import { convertMoney, getCabinetStatusColor } from '../../../utils';
import { useOnClickOutside } from '../../utils/HandleClickOutside';

interface ICabinetSelectFormProps {
    selected?: TCabinet,
    cabinets: TCabinet[],
    onSelect: (cabinet: TCabinet) => void,
    onClose: () => void
}

export const CabinetSelectForm: React.FunctionComponent<ICabinetSelectFormProps> = (props) => {

    const ref = useRef()
    useOnClickOutside(ref, () => { props.onClose() })

    const onSelect = (cabinet: TCabinet) => {
        props.onSelect(cabinet)
        props.onClose()
    }

    const renderWallet = () => {
        var className = 'cab-cabinet-select-form-item'
        className = props.selected === null ? className + ' cab-cabinet-select-form-item-selected' : className

        return <>
            <div className={className} onClick={_ => onSelect(null)}>
                <div className='cab-cabinet-select-form-item-status'><span><i style={{ color: 'gainsboro' }} className="fas fa-circle"></i></span></div>
                <p className='cab-cabinet-select-form-item-name'>{'Персональный счет'}</p>
            </div>
        </>
    }

    return <>
        <div className='cab-cabinet-select-form-container' ref={ref}>
            <p className='cab-cabinet-select-form-title'>Выберите кабинет</p>
            <div className='cab-cabinet-select-form-itemlist'>
                {renderWallet()}
                {props.cabinets.map(c => {
                    var status_color = getCabinetStatusColor(c.status)

                    var className = 'cab-cabinet-select-form-item'
                    className = props.selected && props.selected.id === c.id ? className + ' cab-cabinet-select-form-item-selected' : className
                    return <>
                        <div className={className} onClick={_ => onSelect(c)}>
                            <div className='cab-cabinet-select-form-item-status'><span><i style={{ color: status_color }} className="fas fa-circle"></i></span></div>
                            <p className='cab-cabinet-select-form-item-name'>{c.name}</p>
                        </div>
                    </>
                })}

            </div>
        </div>
    </>
}

interface IMoneyAdditionFormProps {
    cabinet?: TCabinet,
    onClose: () => void
}

const MoneyAdditionForm: React.FunctionComponent<IMoneyAdditionFormProps> = (props) => {
    const dispatch = useDispatch()

    const cabinetState = useSelector((state: RootStore) => state.cabinets)
    const authState = useSelector((state: RootStore) => state.auth)

    const ref = useRef()
    useOnClickOutside(ref, () => { props.onClose() })

    const [selectedCabinet, setSelectedCabinet] = useState(props.cabinet ? props.cabinet : null)
    const [isSelectCabinetWindow, setIsSelectCabinetWindow] = useState(false)

    const [offerCheck, setOfferCheck] = useState(false)
    const [advertCheck, setAdvertCheck] = useState(false)

    const [email, setEmail] = useState(authState.user.email)
    const [amount, setAmount] = useState(0)

    const onSubmit = (e) => {
        e.preventDefault()
        if (advertCheck && offerCheck && amount > 0 && email.length > 0) {

            const is_wallet = selectedCabinet ? 0 : 1
            const client_id = selectedCabinet ? selectedCabinet.id : -1

            dispatch(initPayment(amount, is_wallet, client_id, email))
            props.onClose()
        }
    }

    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    return <>
        <div className={'m-background' + mobileClass}></div>
        <div className={'m-popup-container' + mobileClass} ref={ref}>

            <p className={'cab-money-add-title' + mobileClass}>
                Пополнить кабинет
            </p>
            <span onClick={_ => props.onClose()} className={'m-popup-container-close' + mobileClass}><i className='fas fa-times'></i></span>
            <form onSubmit={onSubmit}>
                <div className={'cab-money-add-cabinet-select-container' + mobileClass}>
                    <label>Выберите кабинет</label>

                    <div className={'cab-money-add-cabinet-select-menu' + mobileClass} onClick={_ => setIsSelectCabinetWindow(true)}>
                        {selectedCabinet ? <>
                            <div className={'cab-money-add-cabinet-select-menu-item' + mobileClass}>
                                <div className={'cab-money-add-cabinet-select-menu-item-status' + mobileClass}>
                                    <span><i style={{ color: getCabinetStatusColor(selectedCabinet.status) }} className="fas fa-circle"></i></span>
                                </div>
                                <p className={'cab-money-add-cabinet-select-menu-item-name' + mobileClass}>
                                    {selectedCabinet.name}
                                </p>
                            </div>
                        </> : <>
                            <div className={'cab-money-add-cabinet-select-menu-item' + mobileClass}>
                                <div className={'cab-money-add-cabinet-select-menu-item-status' + mobileClass}>
                                    <span><i style={{ color: 'gainsboro' }} className="fas fa-circle"></i></span>
                                </div>
                                <p className={'cab-money-add-cabinet-select-menu-item-name' + mobileClass}>
                                    Персональный счет
                                </p>
                            </div>
                        </>}
                        <span className={'cab-money-add-cabinet-select-menu-arrow' + mobileClass}>
                            <i className='fas fa-sort-down'></i>
                        </span>
                    </div>

                    <div className={'cab-money-add-credentials' + mobileClass}>
                        <div className={'cab-money-add-credentials-input-container' + mobileClass}>
                            <span><i className="far fa-credit-card"></i></span>
                            <input required value={amount === 0 ? '' : amount} onChange={e => setAmount(e.target.value === '' ? 0 : parseInt(e.target.value))} placeholder={'Сумма пополнения (₽)' + mobileClass}></input>
                        </div>
                        <div className={'cab-money-add-credentials-input-container' + mobileClass}>
                            <span><i className="far fa-envelope"></i></span>
                            <input required value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder={'Электронная почта' + mobileClass}></input>
                        </div>
                    </div>

                    <div className={'cab-money-add-rules' + mobileClass}>
                        <div className={'cab-money-add-rule' + mobileClass}>
                            <div className={'cab-money-add-rule-toggle' + mobileClass} onClick={_ => setOfferCheck(!offerCheck)}>
                                {offerCheck ? <span className='color-green'><i className="fas fa-toggle-on"></i></span> : <span className='color-grey'><i className="fas fa-toggle-off"></i></span>}

                            </div>
                            <p>Подтверждаю ознакомление и принимаю <a>все условия</a> договора-оферты</p>
                        </div>
                        <div className={'cab-money-add-rule' + mobileClass}>
                            <div className={'cab-money-add-rule-toggle' + mobileClass} onClick={_ => setAdvertCheck(!advertCheck)}>
                                {advertCheck ? <span className='color-green'><i className="fas fa-toggle-on"></i></span> : <span className='color-grey'><i className="fas fa-toggle-off"></i></span>}
                            </div>
                            <p>Подтверждаю ознакомление и принимаю <a>правила</a> размещения рекламных объявлений в ВКонтакте</p>
                        </div>
                    </div>

                    <div className={'cab-money-add-results' + mobileClass}>
                        <label>Сумма пополнения</label>
                        <p>{convertMoney(amount)}</p>
                        <label>Бонусы</label>
                        <p>{convertMoney(Math.floor(amount * 0.1))}</p>
                        <label>Итого к зачислению</label>
                        <p className='color-green'>{convertMoney(amount + Math.floor(amount * 0.1))}</p>
                    </div>
                    {advertCheck && offerCheck && amount > 0 && email.length > 0 ? <>
                        <button type="submit" value="Submit" className={'cab-money-add-submit' + mobileClass}>
                            Пополнить
                        </button>
                    </> : <>
                        <button type="submit" value="Submit" onClick={_ => { dispatch(createAlert({ message: 'Заполните форму корректно.', type: 'warning' })) }} className='cab-money-add-submit cab-money-add-submit-false'>
                            Пополнить
                        </button>
                    </>}

                </div>
            </form>

            {isSelectCabinetWindow && <CabinetSelectForm
                onClose={() => setIsSelectCabinetWindow(false)}
                onSelect={cabinet => setSelectedCabinet(cabinet)}
                cabinets={cabinetState.cabinets}
                selected={selectedCabinet}
            />}

        </div>



    </>;
};

export default MoneyAdditionForm;
