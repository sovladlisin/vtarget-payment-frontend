import * as React from 'react';
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

    const onSubmit = () => {
        dispatch(createAlert({ message: 'Форма отправленна.', type: 'success' }))
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

    return <>
        <div className='m-background'></div>
        <div className='m-popup-container' ref={ref}>

            <p className='cab-money-add-title'>
                Перевести бюджет
            </p>
            <p className='cab-money-add-title-description'>
                Вы можете свободно перемещать бюджеты между своими кабинетами
            </p>
            <span onClick={_ => props.onClose()} className='m-popup-container-close'><i className='fas fa-times'></i></span>
            <form onSubmit={onSubmit}>
                <div className='cab-money-add-cabinet-select-container'>
                    <label>Выберите кабинет списания</label>

                    <div className='cab-money-swap-cabinet-select-menu' onClick={_ => setIsSelectCabinetWindow(0)}>
                        {cabinetFrom ? <>
                            <div className='cab-money-swap-cabinet-select-menu-item'>
                                <div className='cab-money-swap-cabinet-select-menu-item-description'>
                                    <div className='cab-money-swap-cabinet-select-menu-item-status'>
                                        <span><i style={{ color: getCabinetStatusColor(cabinetFrom.status) }} className="fas fa-circle"></i></span>
                                    </div>
                                    <p className='cab-money-swap-cabinet-select-menu-item-name'>
                                        {cabinetFrom.name}
                                    </p>
                                </div>
                                <div className='cab-money-swap-cabinet-select-menu-item-money color-green'>
                                    {convertMoney(cabinetFrom.balance - cabinetFrom.spent)}
                                </div>
                            </div>
                        </> : <>
                            <div className='cab-money-swap-cabinet-select-menu-item'>
                                <div className='cab-money-swap-cabinet-select-menu-item-status-empty'>
                                    <span><i className="fas fa-circle color-grey"></i></span>
                                </div>
                                <p className='cab-money-swap-cabinet-select-menu-item-name-empty'>
                                    Кабинет не выбран
                                </p>
                            </div>
                        </>}


                        <span className='cab-money-swap-cabinet-select-menu-arrow'>
                            <i className='fas fa-sort-down'></i>
                        </span>
                    </div>

                    <div className='cab-money-swap-separator'>
                        <span className='cab-money-separator-line'></span>
                        <button onClick={swapCabinets}><i className='fas fa-sync-alt'></i></button>
                    </div>

                    <label>Выберите кабинет пополнения</label>

                    <div className='cab-money-swap-cabinet-select-menu' onClick={_ => setIsSelectCabinetWindow(1)}>
                        {cabinetTo ? <>
                            <div className='cab-money-swap-cabinet-select-menu-item'>
                                <div className='cab-money-swap-cabinet-select-menu-item-description'>
                                    <div className='cab-money-swap-cabinet-select-menu-item-status'>
                                        <span><i style={{ color: getCabinetStatusColor(cabinetTo.status) }} className="fas fa-circle"></i></span>
                                    </div>
                                    <p className='cab-money-swap-cabinet-select-menu-item-name'>
                                        {cabinetTo.name}
                                    </p>
                                </div>

                                <div className='cab-money-swap-cabinet-select-menu-item-money color-green'>
                                    {convertMoney(cabinetTo.balance - cabinetTo.spent)}
                                </div>
                            </div>
                        </> : <>
                            <div className='cab-money-swap-cabinet-select-menu-item'>
                                <div className='cab-money-swap-cabinet-select-menu-item-status-empty'>
                                    <span><i className="fas fa-circle color-grey"></i></span>
                                </div>
                                <p className='cab-money-swap-cabinet-select-menu-item-name-empty'>
                                    Кабинет не выбран
                                </p>
                            </div>
                        </>}


                        <span className='cab-money-swap-cabinet-select-menu-arrow'>
                            <i className='fas fa-sort-down'></i>
                        </span>
                    </div>



                    <div className='cab-money-swap-input-container'>
                        <span><i className="fas fa-exchange-alt"></i></span>
                        <input required value={exchangeAmount === 0 ? '' : exchangeAmount} onChange={e => setExchangeAmount(e.target.value === '' ? 0 : parseInt(e.target.value))} placeholder={'Сумма перевода (₽)'}></input>

                        {cabinetFrom && exchangeAmount > 0 && exchangeAmount > cabinetFrom.balance - cabinetFrom.spent && <>
                            <span className='cab-money-swap-input-container-alert-text color-red'>
                                Сумма перевода больше, чем доступно в кабинете
                            </span>
                            <span className='cab-money-swap-input-container-alert-icon color-red'>
                                <i className='fas fa-exclamation-circle'></i>
                            </span>
                        </>}


                    </div>



                    {cabinetTo && cabinetFrom && exchangeAmount <= cabinetFrom.balance - cabinetFrom.spent && cabinetFrom.id != cabinetTo.id ? <>
                        <button type="submit" value="Submit" className='cab-money-add-submit'>
                            Пополнить
                        </button>
                    </> : <>
                        <button onClick={_ => dispatch(createAlert({ message: 'Заполните форму корректно.', type: 'warning' }))} className='cab-money-add-submit cab-money-add-submit-false'>
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
