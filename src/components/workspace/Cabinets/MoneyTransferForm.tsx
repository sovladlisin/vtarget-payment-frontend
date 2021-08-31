import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from '../../../actions/alerts/alerts';
import { transferWithClient, transferWithWallet } from '../../../actions/cabinets/cabinets';
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
    const authState = useSelector((state: RootStore) => state.auth)
    const onSubmit = (e) => {
        e.preventDefault()
        if (exchangeAmount != 0 && exchangeAmountCheck() && vkRestrictionCheck()) {
            if (!cabinetFrom && cabinetTo) dispatch(transferWithWallet(0, cabinetTo.id, exchangeAmount))
            if (cabinetFrom && !cabinetTo) dispatch(transferWithWallet(1, cabinetFrom.id, exchangeAmount))
            if (cabinetTo && cabinetFrom) dispatch(transferWithClient(cabinetFrom.id, cabinetTo.id, exchangeAmount))
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
        // between clients
        if (cabinetFrom && cabinetTo && exchangeAmount > 0 && exchangeAmount < cabinetFrom.all_limit - cabinetFrom.spent)
            return true

        // to wallet
        if (cabinetFrom && !cabinetTo && exchangeAmount > 0 && exchangeAmount < cabinetFrom.all_limit - cabinetFrom.spent)
            return true

        // from wallet
        if (!cabinetFrom && cabinetTo && exchangeAmount > 0 && exchangeAmount < authState.user.wallet)
            return true
        return false
    }

    const vkRestrictionCheck = () => {
        // between clients
        if (cabinetFrom && cabinetTo && cabinetTo.all_limit + exchangeAmount >= 100 && cabinetFrom.all_limit - exchangeAmount >= 100)
            return true

        // to wallet
        if (cabinetFrom && !cabinetTo && cabinetFrom.all_limit - exchangeAmount >= 100)
            return true

        // from wallet
        if (!cabinetFrom && cabinetTo && cabinetTo.all_limit + exchangeAmount >= 100)
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
                                    {convertMoney(cabinetFrom.all_limit - cabinetFrom.spent)}
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
                                    {convertMoney(authState.user.wallet)}
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
                                    {convertMoney(cabinetTo.all_limit - cabinetTo.spent)}
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
                                    {convertMoney(authState.user.wallet)}
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

                        {exchangeAmount === 0 ?
                            <>
                                <span className={'cab-money-swap-input-container-alert-text color-red' + mobileClass}>
                                    Сумма перевода не должна быть равна 0
                                </span>
                                <span className={'cab-money-swap-input-container-alert-icon color-red' + mobileClass}>
                                    <i className='fas fa-exclamation-circle'></i>
                                </span>
                            </> : !exchangeAmountCheck() ?
                                <>
                                    <span className={'cab-money-swap-input-container-alert-text color-red' + mobileClass}>
                                        Сумма перевода больше, чем доступно в кабинете
                                    </span>
                                    <span className={'cab-money-swap-input-container-alert-icon color-red' + mobileClass}>
                                        <i className='fas fa-exclamation-circle'></i>
                                    </span>
                                </>
                                : !vkRestrictionCheck() ? <>
                                    <span className={'cab-money-swap-input-container-alert-text color-red' + mobileClass}>
                                        Общий взнос кабинета не может быть уменьшен ниже 100
                                    </span>
                                    <span className={'cab-money-swap-input-container-alert-icon color-red' + mobileClass}>
                                        <i className='fas fa-exclamation-circle'></i>
                                    </span>
                                </> : <></>
                        }


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
