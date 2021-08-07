import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { URL } from '../../utils';
import Additions from './Additions/Additions';
import Cabinets from './Cabinets/Cabinets';
import Reports from './Reports/Reports';
import { Link } from 'react-router-dom'
interface IWorkspaceProps {
}

const Workspace: React.FunctionComponent<IWorkspaceProps> = (props) => {

    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth)

    useEffect(() => {
        !authState.user.token && window.location.replace(URL)
    }, [])

    const [selectedWindow, setSelectedWindow] = useState(1)

    return <>
        <div className='ws-container'>
            <div className='ws-header'>
                <Link to='/'><div className='ws-header-back'><i className='fas fa-long-arrow-alt-left'></i></div></Link>
                <div className='ws-header-center'>
                    <button className={selectedWindow === 1 ? 'ws-header-selected' : ''} onClick={_ => setSelectedWindow(1)}><i className="far fa-user-circle"></i><p>Кабинеты</p></button>
                    <button className={selectedWindow === 2 ? 'ws-header-selected' : ''} onClick={_ => setSelectedWindow(2)}><i className="fas fa-wallet"></i><p>Пополнения</p></button>
                    <button className={selectedWindow === 3 ? 'ws-header-selected' : ''} onClick={_ => setSelectedWindow(3)}><i className="fas fa-receipt"></i><p>Отчеты</p></button>
                    <button className={selectedWindow === 4 ? 'ws-header-selected' : ''} onClick={_ => setSelectedWindow(4)}><i className="fas fa-wrench"></i><p>Инструменты</p></button>

                    <div className='ws-header-account'>
                        {authState.user.token && <>
                            <div className='ws-header-account-info'>
                                <p className='ws-header-account-name'>Здравствуйте, <span>{authState.user.user_name}</span></p>
                                <p className='ws-header-account-role'>{authState.user.is_admin ? 'Администратор' : 'Пользователь'}</p>
                            </div>
                            <img src={authState.user.user_img}></img>
                        </>}
                    </div>
                </div>
            </div>
            <div className='ws-body'>
                {selectedWindow === 1 && <Cabinets />}
                {selectedWindow === 2 && <Additions />}
                {selectedWindow === 3 && <Reports />}
                {selectedWindow === 4 && <></>}
            </div>
            <div className='ws-footer'>
                <div className='ws-footer-body'>
                    <div className='ws-footer-logo'>ООО "ВТаргете"</div>
                    <Link to=''>Оферта</Link>
                    <Link to=''>Политика конфиденциальности</Link>
                    <Link to=''>Условия оплаты</Link>
                    <Link to=''>Отказ от ответственности</Link>
                </div>

            </div>
        </div>
    </>;
};

export default Workspace;
