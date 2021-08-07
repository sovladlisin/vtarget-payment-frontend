import * as React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from '../../../actions/alerts/alerts';
import { TCabinet } from '../../../actions/cabinets/types';
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

    return <>
        <div className='cab-cabinet-select-form-container' ref={ref}>
            <p className='cab-cabinet-select-form-title'>Выберите кабинет</p>
            <div className='cab-cabinet-select-form-itemlist'>
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

    const ref = useRef()
    useOnClickOutside(ref, () => { props.onClose() })

    const [selectedCabinet, setSelectedCabinet] = useState(props.cabinet ? props.cabinet : null)
    const [isSelectCabinetWindow, setIsSelectCabinetWindow] = useState(false)

    const [offerCheck, setOfferCheck] = useState(false)
    const [advertCheck, setAdvertCheck] = useState(false)

    const [email, setEmail] = useState('')
    const [amount, setAmount] = useState(0)

    const onSubmit = (e) => {
        e.preventDefault()
        if (advertCheck && offerCheck && amount > 0 && email.length > 0 && selectedCabinet) {
            dispatch(createAlert({ message: 'Форма отправленна.', type: 'success' }))
            props.onClose()
        }
    }

    return <>
        <div className='m-background'></div>
        <div className='m-popup-container' ref={ref}>

            <p className='cab-money-add-title'>
                Пополнить кабинет
            </p>
            <span onClick={_ => props.onClose()} className='m-popup-container-close'><i className='fas fa-times'></i></span>
            <form onSubmit={onSubmit}>
                <div className='cab-money-add-cabinet-select-container'>
                    <label>Выберите кабинет</label>

                    <div className='cab-money-add-cabinet-select-menu' onClick={_ => setIsSelectCabinetWindow(true)}>
                        {selectedCabinet ? <>
                            <div className='cab-money-add-cabinet-select-menu-item'>
                                <div className='cab-money-add-cabinet-select-menu-item-status'>
                                    <span><i style={{ color: getCabinetStatusColor(selectedCabinet.status) }} className="fas fa-circle"></i></span>
                                </div>
                                <p className='cab-money-add-cabinet-select-menu-item-name'>
                                    {selectedCabinet.name}
                                </p>
                            </div>
                        </> : <>
                            <div className='cab-money-add-cabinet-select-menu-item'>
                                <div className='cab-money-add-cabinet-select-menu-item-status'>
                                    <span><i style={{ color: 'gainsboro' }} className="fas fa-circle"></i></span>
                                </div>
                                <p className='cab-money-add-cabinet-select-menu-item-name'>
                                    Кабинет не выбран
                                </p>
                            </div>
                        </>}
                        <span className='cab-money-add-cabinet-select-menu-arrow'>
                            <i className='fas fa-sort-down'></i>
                        </span>
                    </div>

                    <div className='cab-money-add-credentials'>
                        <div className='cab-money-add-credentials-input-container'>
                            <span><i className="far fa-credit-card"></i></span>
                            <input required value={amount === 0 ? '' : amount} onChange={e => setAmount(e.target.value === '' ? 0 : parseInt(e.target.value))} placeholder={'Сумма пополнения (₽)'}></input>
                        </div>
                        <div className='cab-money-add-credentials-input-container'>
                            <span><i className="far fa-envelope"></i></span>
                            <input required value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder={'Электронная почта'}></input>
                        </div>
                    </div>

                    <div className='cab-money-add-rules'>
                        <div className='cab-money-add-rule'>
                            <div className='cab-money-add-rule-toggle' onClick={_ => setOfferCheck(!offerCheck)}>
                                {offerCheck ? <span className='color-green'><i className="fas fa-toggle-on"></i></span> : <span className='color-grey'><i className="fas fa-toggle-off"></i></span>}

                            </div>
                            <p>Подтверждаю ознакомление и принимаю <a>все условия</a> договора-оферты</p>
                        </div>
                        <div className='cab-money-add-rule'>
                            <div className='cab-money-add-rule-toggle' onClick={_ => setAdvertCheck(!advertCheck)}>
                                {advertCheck ? <span className='color-green'><i className="fas fa-toggle-on"></i></span> : <span className='color-grey'><i className="fas fa-toggle-off"></i></span>}
                            </div>
                            <p>Подтверждаю ознакомление и принимаю <a>правила</a> размещения рекламных объявлений в ВКонтакте</p>
                        </div>
                    </div>

                    <div className='cab-money-add-results'>
                        <label>Сумма пополнения</label>
                        <p>{convertMoney(amount)}</p>
                        <label>Бонусы</label>
                        <p>{convertMoney(amount * 0.15)}</p>
                        <label>Итого к зачислению</label>
                        <p className='color-green'>{convertMoney(amount + amount * 0.15)}</p>
                    </div>
                    {advertCheck && offerCheck && amount > 0 && email.length > 0 && selectedCabinet ? <>
                        <button type="submit" value="Submit" className='cab-money-add-submit'>
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
