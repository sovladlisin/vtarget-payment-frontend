import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from '../../actions/alerts/alerts';
import { changeEmailCredentials, changePasswordCredentials, logout } from '../../actions/auth/login';
import { RootStore } from '../../store';
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect';

interface IAccountCredentialsProps {
}

const AccountCredentials: React.FunctionComponent<IAccountCredentialsProps> = (props) => {
    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth)

    const [email, setEmail] = React.useState(authState.user.email)
    const [password, setPassword] = React.useState('')
    const [password2, setPassword2] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [newPassword2, setNewPassword2] = React.useState('')

    const onLogout = () => { dispatch(logout()) }

    const onChangeEmailSubmit = (e) => {
        e.preventDefault()
        dispatch(changeEmailCredentials(password, email))
    }

    const onChangePasswordSubmit = (e) => {
        e.preventDefault()
        if (newPassword != newPassword2) {
            dispatch(createAlert({ type: 'error', message: 'Пароли не совпадают.' }))
            return;
        }
        dispatch(changePasswordCredentials(password2, newPassword2))
    }

    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

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
                <div className={'acc-manage-container' + mobileClass}>
                    <div className={'acc-manage-header' + mobileClass}>
                        <p className={'acc-manage-title' + mobileClass}>
                            Редактировать профиль
                        </p>
                        <button className={'acc-manage-logout color-red' + mobileClass} onClick={onLogout}>
                            Выйти из аккаунта
                        </button>
                    </div>

                    <p className={'acc-manage-inputs-separator' + mobileClass}>
                        Сменить почту
                    </p>
                    <form onSubmit={onChangeEmailSubmit}>
                        <div className={'acc-manage-change-email-container' + mobileClass}>
                            <span><i className='fas fa-envelope'></i></span>
                            <input required type='email' value={email} onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className={'acc-manage-change-password-container' + mobileClass}>
                            <span><i className='fas fa-key'></i></span>
                            <input placeholder={'Введите пароль'} required type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                        </div>

                        <button className={'acc-manage-change-password' + mobileClass}>Сменить почту</button>
                    </form>



                    <p className={'acc-manage-inputs-separator' + mobileClass}>
                        Сменить пароль
                    </p>

                    <form onSubmit={onChangePasswordSubmit}>
                        <div className={'acc-manage-change-password-container' + mobileClass}>
                            <span><i className='fas fa-key'></i></span>
                            <input placeholder={'Введите старый пароль'} required type='password' value={password2} onChange={e => setPassword2(e.target.value)}></input>
                        </div>
                        <div className={'acc-manage-change-password-container' + mobileClass}>
                            <span><i className='fas fa-key'></i></span>
                            <input placeholder={'Введите новый пароль'} required type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)}></input>
                        </div>
                        <div className={'acc-manage-change-password-container' + mobileClass}>
                            <span><i className='fas fa-key'></i></span>
                            <input placeholder={'Повторите новый пароль'} required type='password' value={newPassword2} onChange={e => setNewPassword2(e.target.value)}></input>
                        </div>
                        <button className={'acc-manage-change-password' + mobileClass}>Сменить пароль</button>
                    </form>

                </div>
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

export default AccountCredentials;
