import * as React from 'react';
import { useState } from 'react';
import VkLogo from '../../../images/vk.svg'
import { convertMoney, range } from '../../../utils';
import { TCabinet } from '../../../actions/cabinets/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useEffect } from 'react';
import { getCabinets } from '../../../actions/cabinets/cabinets';
import MoneyAdditionForm from './MoneyAdditionForm';
import { createAlert } from '../../../actions/alerts/alerts';
import MoneyTransferForm from './MoneyTransferForm';
import { isMobile } from 'react-device-detect';
import CabinetMetaForm from './CabinetMetaForm';
import CabinetPermissionsForm from './CabinetPermissionsForm';

interface ICabinetsProps {
}



const Cabinets: React.FunctionComponent<ICabinetsProps> = (props) => {

    const dispatch = useDispatch()

    const [totalMoney, setTotalMoney] = useState(12312341234)

    const [isCreateCabinetWindow, setIsCreateCabinetWindow] = useState(false)
    const [cabinetOnEdit, setCabinetOnEdit] = useState<TCabinet>(null)
    const [cabinetOnPermissionsEdit, setCabinetOnPermissionsEdit] = useState<TCabinet>(null)
    const [cabinetOnMoneyAddition, setCabinetOnMoneyAddition] = useState<TCabinet>(null)
    const [cabinetOnMoneyTransfer, setCabinetOnMoneyTransfer] = useState<TCabinet>(null)

    const [numberOfItems, setNumberOfItems] = useState(20)
    const [pageNumber, setPageNumber] = useState(1)

    const [sortType, setSortType] = useState('balance')
    const [sortOrder, setSortOrder] = useState(1)
    const [searchString, setSearchString] = useState('')

    const cabinetState = useSelector((state: RootStore) => state.cabinets)
    useEffect(() => { dispatch(getCabinets()) }, [])

    const localSort = (a: TCabinet, b: TCabinet) => {

        const transform = (v: any) => {
            if (typeof v != "string") return parseFloat(v)
            if (isNaN(parseInt(v)))
                return v.split(' ').join('')

            return parseFloat(v.split(' ').join(''))
        }
        const field = sortType
        const order = sortOrder


        var x = transform(a[field])
        var y = transform(b[field])

        if (field === 'left') {
            x = a.balance - a.spent
            y = b.balance - b.spent
        }

        if (x < y) {

            return order === -1 ? 1 : -1;
        }
        if (x > y) {
            return order === -1 ? -1 : 1;
        }

        return 0;
    }




    const processCabinets = (cabinets: TCabinet[]): TCabinet[] => {
        var i = 0

        return cabinets
            .filter(c => JSON.stringify(c).toLocaleLowerCase().includes(searchString.toLocaleLowerCase()))
            .sort(localSort)
            .filter(c => {
                i += 1
                if ((i > numberOfItems * (pageNumber - 1)) && (i <= numberOfItems * pageNumber))
                    return true
                return false
            })
    }

    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    return <>
        <div className={'cab-container' + mobileClass}>
            <div className={'cab-header' + mobileClass}>
                <span style={{ backgroundImage: 'url("' + VkLogo + '")' }} className={'table-vk-logo' + mobileClass}></span>
                <p>Рекламные кабинеты</p>
                <button onClick={_ => setIsCreateCabinetWindow(true)}><i className='fas fa-plus-circle'></i>{isMobile ? '' : 'Создать кабинет'}</button>
            </div>
            <div className={'cab-body' + mobileClass}>
                <div className={'cab-body-nav' + mobileClass}>
                    <p>Показывать записей:</p>
                    <select onChange={e => setNumberOfItems(parseInt(e.target.value))} value={numberOfItems}>
                        <option value={5}>5</option>

                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={40}>40</option>
                        <option value={60}>60</option>
                        <option value={80}>80</option>
                    </select>
                    <p>Сортировка:</p>
                    <select onChange={e => setSortType(e.target.value)} value={sortType}>
                        {/* <option value={'date'}>Дата</option> */}
                        <option value={'balance'}>Внесения</option>
                        <option value={'status'}>Статус</option>
                        <option value={'spent'}>Потраченные</option>
                        <option value={'left'}>Остаток</option>
                    </select>
                    <button className={'cab-body-nav-sort-order-button' + mobileClass} onClick={_ => setSortOrder(sortOrder * -1)}>
                        {sortOrder === 1 && <i className="fas fa-sort-amount-up"></i>}
                        {sortOrder === -1 && <i className="fas fa-sort-amount-down"></i>}

                    </button>
                    <p>Поиск:</p>
                    <input onChange={e => setSearchString(e.target.value)} value={searchString}></input>
                </div>
                <div className={'cab-body-cabinet-list' + mobileClass}>
                    {cabinetState.cabinets.length === 0 && <>
                        <div className={'cab-empty-container'}>
                            <span><i className='fas fa-times'></i></span>
                            <p>Список кабинетов пуст.</p>
                            <p>Вы можете создать новый кабинет при нажатии на кнопку "Создать кабинет"</p>
                        </div>
                    </>}
                    {cabinetState.cabinets.length != 0 && processCabinets(cabinetState.cabinets).length === 0 && <>
                        <div className={'cab-empty-container'}>
                            <span><i className='fas fa-times'></i></span>
                            <p>Фильтр поиска не дал результатов.</p>
                        </div>
                    </>}
                    {cabinetState.cabinets &&
                        processCabinets(cabinetState.cabinets)
                            .map(c => {


                                var status_color = 'red'
                                status_color = c.status === 1 ? 'green' : status_color
                                status_color = c.status === 2 ? 'yellow' : status_color

                                return <>
                                    <div className={'cab-body-cabinet-item' + mobileClass}>
                                        <div className={'cab-body-cabinet-item-status' + mobileClass}><span><i style={{ color: status_color }} className="fas fa-circle"></i></span></div>
                                        <p className={'cab-body-cabinet-item-title' + mobileClass}>{c.name}</p>
                                        <div className={'cab-body-cabinet-item-input' + mobileClass}>
                                            <p>{convertMoney(c.balance)}</p>
                                            <span>Внесено</span>
                                        </div>
                                        <div className={'cab-body-cabinet-item-spent' + mobileClass}>
                                            <p>{convertMoney(c.spent)}</p>
                                            <span>Потрачено</span>
                                        </div>
                                        <div className={'cab-body-cabinet-item-left' + mobileClass}>
                                            <p>{convertMoney(c.balance - c.spent)}</p>
                                            <span>Осталось</span>
                                        </div>
                                        <button title='Редактировать кабинет' onClick={_ => setCabinetOnEdit(c)}><i className='fas fa-pen'></i></button>
                                        <button title='Пополнить баланс' onClick={_ => setCabinetOnMoneyAddition(c)}><i className='far fa-credit-card'></i></button>
                                        <button title='Переместить баланс' onClick={_ => setCabinetOnMoneyTransfer(c)}><i className='fas fa-exchange-alt'></i></button>
                                        <button title='Настройка участников' onClick={_ => setCabinetOnPermissionsEdit(c)}><i className='far fa-id-badge'></i></button>
                                        <button title='Подробнее' onClick={_ => dispatch(createAlert({ message: 'Функция в реализации', type: 'notification' }))}><i className='fas fa-chevron-circle-right'></i></button>
                                    </div>
                                </>
                            })}
                </div>
                {/* {cabinetState.cabinets && <>

                </>} */}
                <div className={'cab-page-selector' + mobileClass}>
                    {range(Math.ceil(cabinetState.cabinets.filter(c => JSON.stringify(c).toLocaleLowerCase().includes(searchString.toLocaleLowerCase())).length / numberOfItems)).map(i => {
                        const className = i + 1 === pageNumber ? 'cab-page-selector-button-selected' : ''
                        return <button className={className} onClick={_ => setPageNumber(i + 1)}>{i + 1}</button>
                    })}

                </div>
            </div>
        </div>

        {isCreateCabinetWindow && <CabinetMetaForm onClose={() => setIsCreateCabinetWindow(false)} />}
        {cabinetOnEdit && <CabinetMetaForm cabinet={cabinetOnEdit} onClose={() => setCabinetOnEdit(null)} />}
        {cabinetOnPermissionsEdit && <CabinetPermissionsForm cabinet={cabinetOnPermissionsEdit} onClose={() => setCabinetOnPermissionsEdit(null)} />}
        {cabinetOnMoneyAddition && <MoneyAdditionForm cabinet={cabinetOnMoneyAddition} onClose={() => setCabinetOnMoneyAddition(null)} />}
        {cabinetOnMoneyTransfer && <MoneyTransferForm cabinet={cabinetOnMoneyTransfer} onClose={() => setCabinetOnMoneyTransfer(null)} />}

    </>;
};

export default Cabinets;
