import * as React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import VkLogo from '../../images/vk.svg'
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { SERVER_URL } from '../../utils';
import { login } from '../../actions/auth/login';

interface ILoginProps {

}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    const dispatch = useDispatch()

    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const onLogin = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return <>
        <form onSubmit={onLogin}>
            <div className={'m-login-input-container' + mobileClass}>
                <span><i className="far fa-envelope"></i></span>

                <input placeholder='Электронная почта' onChange={e => setEmail(e.target.value)} value={email}></input>
            </div>
            <div className={'m-login-input-container' + mobileClass}>
                <span><i className="far fa-envelope"></i></span>

                <input placeholder='Пароль' onChange={e => setPassword(e.target.value)} value={password}></input>
            </div>
            <button className={'m-login-confirm' + mobileClass}>Войти</button>
        </form>

        {/* <span className={'m-popup-container-close' + mobileClass} onClick={_ => props.onClose()}><i className='fas fa-times'></i></span>
            <p className={'m-login-title' + mobileClass}>Войти в аккаунт</p>
            <button className={'m-login-vk-login' + mobileClass} onClick={() => dispatch(login())}>
                <span style={{ backgroundImage: 'url("' + VkLogo + '")' }} className={'m-login-vk-logo' + mobileClass}></span>
                <span className={'m-login-vk-text' + mobileClass}>Войти через ВКонтакте</span>
            </button> */}

    </>
};

export default Login;
