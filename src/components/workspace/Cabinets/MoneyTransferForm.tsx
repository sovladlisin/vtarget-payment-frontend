import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from '../../../actions/alerts/alerts';
import { TCabinet } from '../../../actions/cabinets/types';
import { RootStore } from '../../../store';
import { convertMoney, getCabinetStatusColor } from '../../../utils';
import { useOnClickOutside } from '../../utils/HandleClickOutside';
import { CabinetSelectForm } from './MoneyAdditionForm';

interface IMoneyTransferFormProps {
    onClose: () => void,
    cabinet?: TCabinet
}

const MoneyTransferForm: React.FunctionComponent<IMoneyTransferFormProps> = (props) => {
    const dispatch = useDispatch()

    const cabinetState = useSelector((state: RootStore) => state.cabinets)

    const onSubmit = (e) => {
        e.preventDefault()
        if (cabinetTo && cabinetFrom && exchangeAmount <= cabinetFrom.balance - cabinetFrom.spent && cabinetFrom.id != cabinetTo.id) {
            dispatch(createAlert({ message: 'Форма отправленна.', type: 'success' }))
            props.onClose()
        }

    }

    const ref = React.useRef()
    useOnClickOutside(ref, () => { props.onClose() })

    const [cabinetFrom, setCabinetFrom] = React.useState<TCabinet>(props.cabinet ? props.cabinet : null)
    const [cabinetTo, setCabinetTo] = React.useState<TCabinet>(null)

    const [isSelectCabinetWindow, setIsSelectCabinetWindow] = React.useState(-1)

    const [exchangeAmount, setExchangeAmount] = React.useState(0)

    const swapCabinets = () => {
        var temp = cabinetTo
        setCabinetTo(cabinetFrom)
        setCabinetFrom(temp)
    }

    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    const exchangeAmountCheck = () => {
        if (cabinetFrom && exchangeAmount > 0 && exchangeAmount > cabinetFrom.balance - cabinetFrom.spent)
            return true
        if (!cabinetFrom && exchangeAmount > 0 && exchangeAmount > 4305621)
            return true
        return false
    }

    const formValidation = () => {
        if (exchangeAmountCheck && cabinetFrom != cabinetTo)
            return true
        return false
    }

    return <>
        <div className={'m-background' + mobileClass}></div>
        <div className={'m-popup-container' + mobileClass} ref={ref}>

            <p className={'cab-money-add-title' + mobileClass}>
                Перевести бюджет
            </p>
            <p className={'cab-money-add-title-description' + mobileClass}>
                Вы можете свободно перемещать бюджеты между своими кабинетами
            </p>
            <span onClick={_ => props.onClose()} className={'m-popup-container-close' + mobileClass}><i className='fas fa-times'></i></span>
            <form onSubmit={onSubmit}>
                <div className={'cab-money-add-cabinet-select-container' + mobileClass}>
                    <label>Выберите кабинет списания</label>

                    <div className={'cab-money-swap-cabinet-select-menu' + mobileClass} onClick={_ => setIsSelectCabinetWindow(0)}>
                        {cabinetFrom ? <>
                            <div className={'cab-money-swap-cabinet-select-menu-item' + mobileClass}>
                                <div className={'cab-money-swap-cabinet-select-menu-item-description' + mobileClass}>
                                    <div className={'cab-money-swap-cabinet-select-menu-item-status' + mobileClass}>
                                        <span><i style={{ color: getCabinetStatusColor(cabinetFrom.status) }} className="fas fa-circle"></i></span>
                                    </div>
                                    <p className={'cab-money-swap-cabinet-select-menu-item-name' + mobileClass}>
                                        {cabinetFrom.name}
                                    </p>
                                </div>
                                <div className={'cab-money-swap-cabinet-select-menu-item-money color-green' + mobileClass}>
                                    {convertMoney(cabinetFrom.balance - cabinetFrom.spent)}
                                </div>
                            </div>
                        </> : <>
                            <div className={'cab-money-swap-cabinet-select-menu-item' + mobileClass}>
                                <div className={'cab-money-swap-cabinet-select-menu-item-description' + mobileClass}>
                                    <div className={'cab-money-swap-cabinet-select-menu-item-status' + mobileClass}>
                                        <span><i style={{ color: getCabinetStatusColor(1) }} className="fas fa-circle"></i></span>
                                    </div>
                                    <p className={'cab-money-swap-cabinet-select-menu-item-name' + mobileClass}>
                                        {'Персональный счет'}
                                    </p>
                                </div>
                                <div className={'cab-money-swap-cabinet-select-menu-item-money color-green' + mobileClass}>
                                    {convertMoney(4305621)}
                                </div>
                            </div>
                        </>}


                        <span className={'cab-money-swap-cabinet-select-menu-arrow' + mobileClass}>
                            <i className='fas fa-sort-down'></i>
                        </span>
                    </div>

                    <div className={'cab-money-swap-separator' + mobileClass}>
                        <span className={'cab-money-separator-line' + mobileClass}></span>
                        <button onClick={e => { e.preventDefault(); swapCabinets() }}><i className='fas fa-sync-alt'></i></button>
                    </div>

                    <label>Выберите кабинет пополнения</label>

                    <div className={'cab-money-swap-cabinet-select-menu' + mobileClass} onClick={_ => setIsSelectCabinetWindow(1)}>
                        {cabinetTo ? <>
                            <div className={'cab-money-swap-cabinet-select-menu-item' + mobileClass}>
                                <div className={'cab-money-swap-cabinet-select-menu-item-description' + mobileClass}>
                                    <div className={'cab-money-swap-cabinet-select-menu-item-status' + mobileClass}>
                                        <span><i style={{ color: getCabinetStatusColor(cabinetTo.status) }} className="fas fa-circle"></i></span>
                                    </div>
                                    <p className={'cab-money-swap-cabinet-select-menu-item-name' + mobileClass}>
                                        {cabinetTo.name}
                                    </p>
                                </div>

                                <div className={'cab-money-swap-cabinet-select-menu-item-money color-green' + mobileClass}>
                                    {convertMoney(cabinetTo.balance - cabinetTo.spent)}
                                </div>
                            </div>
                        </> : <>
                            <div className={'cab-money-swap-cabinet-select-menu-item' + mobileClass}>
                                <div className={'cab-money-swap-cabinet-select-menu-item-description' + mobileClass}>
                                    <div className={'cab-money-swap-cabinet-select-menu-item-status' + mobileClass}>
                                        <span><i style={{ color: getCabinetStatusColor(1) }} className="fas fa-circle"></i></span>
                                    </div>
                                    <p className={'cab-money-swap-cabinet-select-menu-item-name' + mobileClass}>
                                        {'Персональный счет'}
                                    </p>
                                </div>
                                <div className={'cab-money-swap-cabinet-select-menu-item-money color-green' + mobileClass}>
                                    {convertMoney(4305621)}
                                </div>
                            </div>
                        </>}


                        <span className={'cab-money-swap-cabinet-select-menu-arrow' + mobileClass}>
                            <i className='fas fa-sort-down'></i>
                        </span>
                    </div>



                    <div className={'cab-money-swap-input-container' + mobileClass}>
                        <span><i className="fas fa-exchange-alt"></i></span>
                        <input required value={exchangeAmount === 0 ? '' : exchangeAmount} onChange={e => setExchangeAmount(e.target.value === '' ? 0 : parseInt(e.target.value))} placeholder={'Сумма перевода (₽)' + mobileClass}></input>

                        {exchangeAmountCheck()
                            && <>
                                <span className={'cab-money-swap-input-container-alert-text color-red' + mobileClass}>
                                    Сумма перевода больше, чем доступно в кабинете
                                </span>
                                <span className={'cab-money-swap-input-container-alert-icon color-red' + mobileClass}>
                                    <i className='fas fa-exclamation-circle'></i>
                                </span>
                            </>}


                    </div>



                    {formValidation() ? <>
                        <button type="submit" value="Submit" className={'cab-money-add-submit' + mobileClass}>
                            Пополнить
                        </button>
                    </> : <>
                        <button type="submit" value="Submit" onClick={_ => { dispatch(createAlert({ message: 'Заполните форму корректно.', type: 'warning' })) }} className={'cab-money-add-submit cab-money-add-submit-false' + mobileClass}>
                            Пополнить
                        </button>
                    </>}

                </div>
            </form>

            {isSelectCabinetWindow != -1 && <CabinetSelectForm
                onClose={() => setIsSelectCabinetWindow(-1)}
                onSelect={cabinet => { isSelectCabinetWindow === 0 ? setCabinetFrom(cabinet) : setCabinetTo(cabinet) }}
                cabinets={cabinetState.cabinets}
                selected={isSelectCabinetWindow === 0 ? cabinetFrom : cabinetTo}
            />}

        </div>



    </>;
};

export default MoneyTransferForm;
