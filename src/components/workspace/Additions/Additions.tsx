import * as React from 'react';
import { useEffect } from 'react';
import { convertMoney } from '../../../utils';


type TAddition = {
    date: Date,
    amount: number,
    status: 0 | 1 | 2,
    type: 0 | 1
}

interface IAdditionsProps {
}



const Additions: React.FunctionComponent<IAdditionsProps> = (props) => {

    const dummyAdditions: TAddition[] = [
        { date: new Date(), amount: 458632, status: 1, type: 1 },
        { date: new Date(), amount: 458632, status: 1, type: 0 },
        { date: new Date(), amount: 458632, status: 2, type: 1 },
        { date: new Date(), amount: 458632, status: 0, type: 1 },
        { date: new Date(), amount: 458632, status: 2, type: 0 },
        { date: new Date('2020-01-03'), amount: 458632, status: 2, type: 1 },
        { date: new Date('2020-01-03'), amount: 458632, status: 1, type: 1 },
        { date: new Date('2020-01-03'), amount: 458632, status: 2, type: 0 },
        { date: new Date('2020-01-03'), amount: 458632, status: 1, type: 1 },
        { date: new Date('2019-01-03'), amount: 458632, status: 2, type: 1 },
        { date: new Date('2019-01-03'), amount: 458632, status: 2, type: 1 },
        { date: new Date('2019-01-03'), amount: 458632, status: 0, type: 0 },
        { date: new Date('2019-01-03'), amount: 458632, status: 2, type: 1 },
    ]

    const [numberOfItems, setNumberOfItems] = React.useState(20)
    const [sortType, setSortType] = React.useState('date')
    const [sortOrder, setSortOrder] = React.useState(1)
    const [searchString, setSearchString] = React.useState('')

    const [additionList, setAdditionList] = React.useState<TAddition[]>([])
    const processAdditions = (additions: TAddition[]): { [key: string]: TAddition[] } => {

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

        var result: { [key: string]: TAddition[] } = {}
        additions.map(a => {
            const year = new Date(a.date).getFullYear()
            var temp: TAddition[] = result[year]
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
    useEffect(() => { setAdditionList(dummyAdditions) }, [])

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
                    {Object.keys(processAdditions(additionList)).sort((a, b) => { return parseInt(b) - parseInt(a) }).map(year => {
                        const list = processAdditions(additionList)
                        const item = list[year]
                        return <>
                            <div className='additions-body-item-list-cluster'>
                                <p className='additions-body-item-list-cluster-title'>{year}</p>
                                {item.filter(a => JSON.stringify(a).toLocaleLowerCase().includes(searchString.toLocaleLowerCase())).map(addition => {
                                    return <>
                                        <div className='additions-body-item-list-item'>
                                            <p className='additions-body-item-list-item-amount'>{convertMoney(addition.amount)}</p>
                                            <p className='additions-body-item-list-item-date'>
                                                <span>{addition.date.toLocaleDateString()}</span>
                                                <span>{addition.date.toLocaleTimeString()}</span>


                                            </p>
                                            <div className={addition.type === 1 ? 'additions-body-item-list-item-type-1' : 'additions-body-item-list-item-type-0'}>
                                                <i className='fas fa-chevron-circle-up'></i>
                                                <p>{addition.type === 1 ? 'Прямое пополнение' : 'Стороннее пополнение'}</p>
                                            </div>
                                            {addition.status === 0 && <div className='additions-body-item-list-item-status-0'>
                                                <i className='fas fa-check'></i>
                                                <p>Выполнено</p>
                                            </div>}
                                            {addition.status === 1 && <div className='additions-body-item-list-item-status-1'>
                                                <i className='fas fa-check'></i>
                                                <p>В обработке</p>
                                            </div>}
                                            {addition.status === 2 && <div className='additions-body-item-list-item-status-2'>
                                                <i className='fas fa-check'></i>
                                                <p>Отклонено</p>
                                            </div>}
                                        </div>
                                    </>
                                })}
                            </div>
                        </>
                    })}
                </div>
            </div>
        </div>

    </>;
};

export default Additions;
