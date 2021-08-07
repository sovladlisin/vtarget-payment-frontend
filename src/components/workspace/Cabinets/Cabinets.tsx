import * as React from 'react';
import { useState } from 'react';
import VkLogo from '../../../images/vk.svg'
import { convertMoney } from '../../../utils';
import { TCabinet } from '../../../actions/cabinets/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useEffect } from 'react';
import { getCabinets } from '../../../actions/cabinets/cabinets';
import CabinetForm from './CabinetForm';
import MoneyAdditionForm from './MoneyAdditionForm';

interface ICabinetsProps {
}



const Cabinets: React.FunctionComponent<ICabinetsProps> = (props) => {

    const dispatch = useDispatch()

    const [totalMoney, setTotalMoney] = useState(12312341234)

    const [isCreateCabinetWindow, setIsCreateCabinetWindow] = useState(false)
    const [cabinetOnEdit, setCabinetOnEdit] = useState<TCabinet>(null)
    const [cabinetOnMoneyAddition, setCabinetOnMoneyAddition] = useState<TCabinet>(null)

    const [numberOfItems, setNumberOfItems] = useState(20)
    const [sortType, setSortType] = useState('date')
    const [sortOrder, setSortOrder] = useState(1)
    const [searchString, setSearchString] = useState('')

    const cabinetState = useSelector((state: RootStore) => state.cabinets)
    useEffect(() => { dispatch(getCabinets()) }, [])

    return <>
        <div className='cab-container'>
            <div className='cab-header'>
                <span style={{ backgroundImage: 'url("' + VkLogo + '")' }} className='table-vk-logo'></span>
                <p>Рекламные кабинеты</p>
                <button onClick={_ => setIsCreateCabinetWindow(true)}><i className='fas fa-plus-circle'></i>Создать кабинет</button>
            </div>
            <div className='cab-body'>
                <div className='cab-body-nav'>
                    <p>Показывать записей:</p>
                    <select onChange={e => setNumberOfItems(parseInt(e.target.value))} value={numberOfItems}>
                        <option value={20}>20</option>
                        <option value={40}>40</option>
                        <option value={60}>60</option>
                        <option value={80}>80</option>
                    </select>
                    <p>Сортировка:</p>
                    <select onChange={e => setSortType(e.target.value)} value={sortOrder}>
                        <option value={'date'}>Дата</option>
                        <option value={'status'}>Статус</option>
                        <option value={'inputs'}>Внесения</option>
                        <option value={'spent'}>Потраченные</option>
                        <option value={'left'}>Остаток</option>
                    </select>
                    <p>Поиск:</p>
                    <input onChange={e => setSearchString(e.target.value)} value={searchString}></input>
                </div>
                <div className='cab-body-cabinet-list'>
                    {cabinetState.cabinets.map(c => {
                        var status_color = 'red'
                        status_color = c.status === 1 ? 'green' : status_color
                        status_color = c.status === 2 ? 'yellow' : status_color

                        return <>
                            <div className='cab-body-cabinet-item'>
                                <div className='cab-body-cabinet-item-status'><span><i style={{ color: status_color }} className="fas fa-circle"></i></span></div>
                                <p className='cab-body-cabinet-item-title'>{c.name}</p>
                                <div className='cab-body-cabinet-item-input'>
                                    <p>{convertMoney(c.balance)}</p>
                                    <span>Внесено</span>
                                </div>
                                <div className='cab-body-cabinet-item-spent'>
                                    <p>{convertMoney(c.spent)}</p>
                                    <span>Потрачено</span>
                                </div>
                                <div className='cab-body-cabinet-item-left'>
                                    <p>{convertMoney(c.balance - c.spent)}</p>
                                    <span>Осталось</span>
                                </div>
                                <button title='Редактировать кабинет' onClick={_ => setCabinetOnEdit(c)}><i className='fas fa-pen'></i></button>
                                <button title='Пополнить баланс' onClick={_ => setCabinetOnMoneyAddition(c)}><i className='far fa-credit-card'></i></button>
                                <button title='Переместить баланс'><i className='fas fa-exchange-alt'></i></button>
                                <button title='Настройка участников' onClick={_ => setCabinetOnEdit(c)}><i className='far fa-id-badge'></i></button>
                                <button title='Подробнее'><i className='fas fa-chevron-circle-right'></i></button>
                            </div>
                        </>
                    })}
                </div>
            </div>
        </div>

        {isCreateCabinetWindow && <CabinetForm onClose={() => setIsCreateCabinetWindow(false)} />}

        {cabinetOnEdit && <CabinetForm cabinet={cabinetOnEdit} onClose={() => setCabinetOnEdit(null)} />}
        {cabinetOnMoneyAddition && <MoneyAdditionForm cabinet={cabinetOnMoneyAddition} onClose={() => setCabinetOnMoneyAddition(null)} />}

    </>;
};

export default Cabinets;
