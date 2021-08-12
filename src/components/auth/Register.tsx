import * as React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import VkLogo from '../../images/vk.svg'
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { SERVER_URL } from '../../utils';
import { register } from '../../actions/auth/login';

interface IRegisterProps {
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
    const dispatch = useDispatch()

    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [password2, setPassword2] = React.useState('')

    const onRegister = (e) => {
        e.preventDefault()
        dispatch(register(username, password, password2, email))
    }

    return <>
        <form onSubmit={onRegister}>
            <div className={'m-login-input-container' + mobileClass}>
                <span><i className="far fa-envelope"></i></span>

                <input placeholder='Имя пользователя' onChange={e => setUsername(e.target.value)} value={username}></input>
            </div>
            <div className={'m-login-input-container' + mobileClass}>
                <span><i className="far fa-envelope"></i></span>

                <input placeholder='Электронная почта' onChange={e => setEmail(e.target.value)} value={email}></input>
            </div>
            <div className={'m-login-input-container' + mobileClass}>
                <span><i className="far fa-envelope"></i></span>

                <input placeholder='Пароль' onChange={e => setPassword(e.target.value)} value={password}></input>
            </div>
            <div className={'m-login-input-container' + mobileClass}>
                <span><i className="far fa-envelope"></i></span>

                <input placeholder='Повторите пароль' onChange={e => setPassword2(e.target.value)} value={password2}></input>
            </div>
            <button className={'m-login-confirm' + mobileClass}>Зарегистрироваться</button>
        </form>


    </>;
};

export default Register;
