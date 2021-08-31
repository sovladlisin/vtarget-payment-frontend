import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from '../../../actions/alerts/alerts';
import { TCabinet } from '../../../actions/cabinets/types';
import { getPayments } from '../../../actions/payment/payment';
import { PAYMENT_TYPES, TPayment } from '../../../actions/payment/types';
import { RootStore } from '../../../store';
import { convertMoney } from '../../../utils';
import RefundForm from './RefundForm';


interface IAdditionsProps {
}



const Additions: React.FunctionComponent<IAdditionsProps> = (props) => {

    const dispatch = useDispatch()
    const paymentState = useSelector((state: RootStore) => state.payments)
    const cabinetState = useSelector((state: RootStore) => state.cabinets)

    const [numberOfItems, setNumberOfItems] = React.useState(20)
    const [sortType, setSortType] = React.useState('date')
    const [sortOrder, setSortOrder] = React.useState(1)
    const [searchString, setSearchString] = React.useState('')

    const processPayments = (payments: TPayment[]): { [key: string]: TPayment[] } => {

        const compare = (a, b) => {
            if (a[sortType] > b[sortType]) {
                return sortOrder === 1 ? 1 : -1;
            }
            if (a[sortType] < b[sortType]) {
                return sortOrder === 1 ? -1 : 1;
            }
            // a must be equal to b
            return 0;
        }

        var result: { [key: string]: TPayment[] } = {}
        payments.map(a => {
            const year = new Date(a.date).getFullYear()
            var temp: TPayment[] = result[year]
            temp = temp ? temp : []
            temp.push(a)
            result[year] = temp
        })
        Object.keys(result).map(year => {
            var add_list = result[year]
            add_list = add_list.sort(compare)
            result[year] = add_list
        })
        return result
    }
    useEffect(() => { dispatch(getPayments()) }, [])

    const [hoveringPayment, setHoveringPayment] = React.useState(-1)
    const [paymentToRefund, setPaymentToRefund] = React.useState<TPayment>(null)

    return <>
        <div className='additions-container'>
            <div className='additions-header'>
                <p>Пополнения</p>
            </div>
            <div className='additions-body'>
                <div className='additions-body-nav'>
                    <p>Показывать записей:</p>
                    <select onChange={e => setNumberOfItems(parseInt(e.target.value))} value={numberOfItems}>
                        <option value={20}>20</option>
                        <option value={40}>40</option>
                        <option value={60}>60</option>
                        <option value={80}>80</option>
                    </select>
                    {/* <p>Сортировка:</p>
                    <select onChange={e => setSortType(e.target.value)} value={sortOrder}>
                        <option value={'date'}>Дата</option>
                        <option value={'status'}>Статус</option>
                        <option value={'inputs'}>Внесения</option>
                        <option value={'spent'}>Потраченные</option>
                        <option value={'left'}>Остаток</option>
                    </select> */}
                    <p>Поиск:</p>
                    <input onChange={e => setSearchString(e.target.value)} value={searchString}></input>
                </div>
                <div className='additions-body-item-list'>
                    {paymentState.payments && <>
                        {Object.keys(processPayments(paymentState.payments)).sort((a, b) => { return parseInt(b) - parseInt(a) }).map(year => {
                            const list = processPayments(paymentState.payments)
                            const item = list[year]
                            return <>
                                <div className='additions-body-item-list-cluster'>
                                    <p className='additions-body-item-list-cluster-title'>{year}</p>
                                    {item.filter(a => JSON.stringify(a).toLocaleLowerCase().includes(searchString.toLocaleLowerCase())).map(addition => {
                                        return <>
                                            <div className='additions-body-item-list-item'>
                                                <p className='additions-body-item-list-item-amount'>{convertMoney(addition.amount)}</p>
                                                <p className='additions-body-item-list-item-date'>
                                                    <span>{new Date(addition.date).toLocaleDateString()}</span>
                                                    <span>{new Date(addition.date).toLocaleTimeString()}</span>


                                                </p>
                                                <div className={1 ? 'additions-body-item-list-item-type-1' : 'additions-body-item-list-item-type-0'}>
                                                    <i className='fas fa-chevron-circle-up'></i>
                                                    <p>{1 ? 'Прямое пополнение' : 'Стороннее пополнение'}</p>
                                                </div>
                                                {addition.status === 'CONFIRMED' ? <div className='additions-body-item-list-item-status-0'>
                                                    <i className='fas fa-check'></i>
                                                    <p
                                                        onMouseEnter={_ => setHoveringPayment(addition.id)}
                                                        onMouseLeave={_ => setHoveringPayment(-1)}
                                                        onClick={_ => {
                                                            var client_id = parseInt(addition.order_id.split('_')[1])
                                                            var amount = parseInt(addition.order_id.split('_')[3])
                                                            var client: TCabinet = cabinetState.cabinets.find(c => c.id === client_id)
                                                            if (!client) {
                                                                console.log('Client_Error')
                                                                return;
                                                            }
                                                            var left = client.all_limit - client.spent

                                                            if (amount > left) {
                                                                dispatch(createAlert({ type: 'error', message: 'Средства на клиенте ' + client.name + ' уже были потрачены.' }))
                                                            }
                                                            else {
                                                                setPaymentToRefund(addition)
                                                            }
                                                        }}
                                                        className={'payment-success'}>
                                                        {hoveringPayment === addition.id ? 'Отозвать' : 'Выполнено'}
                                                    </p>
                                                </div>
                                                    :
                                                    <div className={'additions-body-item-list-item-status-2 ' + PAYMENT_TYPES[addition.status].color}>
                                                        <i className='fas fa-check'></i>
                                                        <p title={PAYMENT_TYPES[addition.status].message}>{PAYMENT_TYPES[addition.status].message}</p>
                                                    </div>
                                                }



                                            </div>
                                        </>
                                    })}
                                </div>
                            </>
                        })}
                    </>}

                </div>
            </div>
        </div>
        {paymentToRefund && <RefundForm onClose={() => setPaymentToRefund(null)} payment={paymentToRefund} />}
    </>;
};

export default Additions;
