import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { URL } from '../../utils';
import { Link } from 'react-router-dom'
import VkLogo from '../../images/vk.svg'
import VTargetLogo from '../../images/MyTarget.svg'
import { createAlert } from '../../actions/alerts/alerts';
import { connectVkAccount } from '../../actions/auth/login';

interface IWorkspaceCabinetSelectorProps {
}

const WorkspaceCabinetSelector: React.FunctionComponent<IWorkspaceCabinetSelectorProps> = (props) => {

    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth)

    React.useEffect(() => {
        !authState.user && window.location.replace(URL)
    }, [])

    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    const onVkConnect = () => {
        dispatch(connectVkAccount())
    }

    const onTargetConnect = () => {
        dispatch(createAlert({ type: 'notification', message: 'В разработке.' }))
    }

    const getName = () => authState.user.vk_profile ? authState.user.vk_profile.name : authState.user.username
    const getPicture = () => authState.user.vk_profile ? authState.user.vk_profile.photo : 'http://mymbs.co.id/public/upload/image/user/user.png'

    return <>
        <div className={'ws-container' + mobileClass}>

            <div className={'ws-header' + mobileClass}>
                <Link to='/'><div className={'ws-header-back' + mobileClass}><i className='fas fa-long-arrow-alt-left'></i></div></Link>
                <div className={'ws-header-center' + mobileClass}>
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
                {!authState.user.vk_profile && <>
                    <div className={'ws-body-container' + mobileClass}>
                        <div className={'ws-body-container-main-title-box' + mobileClass}>
                            <p className={'ws-body-container-main-title' + mobileClass}>У вас пока нет привязанных кабинетов.</p>
                            <p className={'ws-body-container-main-title' + mobileClass}>Самое время приступить</p>
                        </div>


                        <button className={'m-login-vk-login bg-red' + mobileClass} onClick={onTargetConnect}>
                            <span style={{ backgroundImage: 'url("' + VTargetLogo + '")' }} className={'m-login-vk-logo' + mobileClass}></span>
                            <span className={'m-login-vk-text' + mobileClass}>Войти через ВТаргет</span>
                        </button>
                        <button className={'m-login-vk-login bg-vk-blue' + mobileClass} onClick={onVkConnect}>
                            <span style={{ backgroundImage: 'url("' + VkLogo + '")' }} className={'m-login-vk-logo' + mobileClass}></span>
                            <span className={'m-login-vk-text' + mobileClass}>Войти через ВКонтакте</span>
                        </button>
                    </div>
                </>}
                {authState.user.vk_profile && <>
                    <div className={'ws-body-container' + mobileClass}>
                        <p className={'ws-body-container-secondary-title' + mobileClass}>Мои рекламные кабинеты</p>
                        <Link to='/workspace'>
                            <div className={'ws-body-workspace-link bg-vk-blue' + mobileClass}>
                                <span style={{ backgroundImage: 'url("' + VkLogo + '")' }} className={'ws-body-workspace-link-logo' + mobileClass}></span>
                                <div className={'ws-body-workspace-link-text-area' + mobileClass}>
                                    <p className={'ws-body-workspace-link-text-area-title' + mobileClass}>Рекламные кабинеты ВКонтакте</p>
                                    <p className={'ws-body-workspace-link-text-area-status' + mobileClass}>Статус: Подключено</p>
                                </div>
                                <span className={'ws-body-workspace-link-arrow' + mobileClass}>
                                    <i className="fas fa-long-arrow-alt-right"></i>
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className={'ws-body-container' + mobileClass}>
                        <p className={'ws-body-container-secondary-title' + mobileClass}>Подключить другие кабинеты</p>
                        <Link><button></button></Link>
                        <Link><button></button></Link>
                        <Link><button></button></Link>
                    </div>
                </>}
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


    </>;
};

export default WorkspaceCabinetSelector;
