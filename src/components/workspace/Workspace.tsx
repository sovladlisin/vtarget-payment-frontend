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
import { isMobile } from 'react-device-detect';
import { useOnClickOutside } from '../utils/HandleClickOutside';
interface IWorkspaceProps {
}

const Workspace: React.FunctionComponent<IWorkspaceProps> = (props) => {

    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth)

    useEffect(() => {
        authState.user.token.length === 0 && window.location.replace(URL)
        !authState.user.vk_profile && window.location.replace(URL)
    }, [])

    const [selectedWindow, setSelectedWindow] = useState(1)

    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    const [isMobileNavWindow, setIsMobileNavWindow] = useState(false)
    const mobileNavRef = React.useRef()
    useOnClickOutside(mobileNavRef, () => setIsMobileNavWindow(false))

    const getName = () => authState.user.vk_profile ? authState.user.vk_profile.name : authState.user.username
    const getPicture = () => authState.user.vk_profile ? authState.user.vk_profile.photo : 'http://mymbs.co.id/public/upload/image/user/user.png'

    return <>
        <div className={'ws-container' + mobileClass}>
            <div className={'ws-header' + mobileClass}>
                {!isMobile && <Link to='/'><div className={'ws-header-back' + mobileClass}><i className='fas fa-long-arrow-alt-left'></i></div></Link>}
                <div className={'ws-header-center' + mobileClass}>

                    {!isMobile && <>
                        <button className={selectedWindow === 1 ? 'ws-header-selected' : ''} onClick={_ => setSelectedWindow(1)}><i className="far fa-user-circle"></i><p>Кабинеты</p></button>
                        <button className={selectedWindow === 2 ? 'ws-header-selected' : ''} onClick={_ => setSelectedWindow(2)}><i className="fas fa-wallet"></i><p>Пополнения</p></button>
                        <button className={selectedWindow === 3 ? 'ws-header-selected' : ''} onClick={_ => { }}><i className="fas fa-receipt"></i><p>Отчеты</p></button>
                        <button className={selectedWindow === 4 ? 'ws-header-selected' : ''} onClick={_ => { }}><i className="fas fa-wrench"></i><p>Инструменты</p></button>
                    </>}
                    {isMobile && <>
                        <button onClick={_ => setIsMobileNavWindow(true)} className='ws-header-open-mobile-nav'><i className="fas fa-bars"></i></button>
                    </>}
                    <div className={'ws-header-account' + mobileClass}>
                        {authState.user.is_online && <>
                            <div className={'ws-header-account-info' + mobileClass}>
                                <p className={'ws-header-account-name' + mobileClass}>Здравствуйте, <span>{getName()}</span></p>
                                <p className={'ws-header-account-role' + mobileClass}>{authState.user.is_admin ? 'Администратор' : 'Пользователь'}</p>
                            </div>
                            <Link to='/credentials'><img src={getPicture()}></img></Link>
                        </>}
                    </div>
                </div>
            </div>
            <div className={'ws-body' + mobileClass}>
                {selectedWindow === 1 && <Cabinets />}
                {selectedWindow === 2 && <Additions />}
                {selectedWindow === 3 && <Reports />}
                {selectedWindow === 4 && <></>}
            </div>
            <div className={'ws-footer' + mobileClass}>
                <div className={'ws-footer-body' + mobileClass}>
                    <div className={'ws-footer-logo' + mobileClass}>ООО "ВТаргете"</div>
                    <Link to=''>Оферта</Link>
                    <Link to=''>Политика конфиденциальности</Link>
                    <Link to=''>Условия оплаты</Link>
                    <Link to=''>Отказ от ответственности</Link>
                </div>
            </div>
        </div>

        {isMobileNavWindow && <>
            <div className='ws-nav-panel-mobile' ref={mobileNavRef}>
                <Link to='/'><div className={'ws-nav-panel-back' + mobileClass}><i className='fas fa-long-arrow-alt-left'></i><p>Вернуться на главную</p></div></Link>
                <button className={selectedWindow === 1 ? 'ws-nav-panel-selected' : ''} onClick={_ => { setSelectedWindow(1); setIsMobileNavWindow(false) }}><i className="far fa-user-circle"></i><p>Кабинеты</p></button>
                <button className={selectedWindow === 2 ? 'ws-nav-panel-selected' : ''} onClick={_ => { setSelectedWindow(2); setIsMobileNavWindow(false) }}><i className="fas fa-wallet"></i><p>Пополнения</p></button>
                <button className={selectedWindow === 3 ? 'ws-nav-panel-selected' : ''} onClick={_ => { }}><i className="fas fa-receipt"></i><p>Отчеты</p></button>
                <button className={selectedWindow === 4 ? 'ws-nav-panel-selected' : ''} onClick={_ => { }}><i className="fas fa-wrench"></i><p>Инструменты</p></button>
            </div>
        </>}
    </>;
};

export default Workspace;
