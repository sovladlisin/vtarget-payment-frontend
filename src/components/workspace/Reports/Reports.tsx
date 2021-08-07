import * as React from 'react';

interface IReportsProps {
}

const Reports: React.FunctionComponent<IReportsProps> = (props) => {

    const [numberOfItems, setNumberOfItems] = React.useState(20)
    const [sortType, setSortType] = React.useState('date')
    const [sortOrder, setSortOrder] = React.useState(1)
    const [searchString, setSearchString] = React.useState('')

    return <>
        <div className='rep-container'>
            <div className='additions-header'>
                <p>Отчеты</p>
            </div>
            <div className='rep-body'>
                <div className='rep-body-nav'>
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
                <div className='rep-body-item-list'>

                </div>
            </div>
        </div>
    </>;
};

export default Reports;
