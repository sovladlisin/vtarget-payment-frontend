import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import Login from './Login';
import Register from './Register';

interface IAuthWindowProps {
    onClose: () => void,

}

const AuthWindow: React.FunctionComponent<IAuthWindowProps> = (props) => {

    const [loginMode, setLoginMode] = React.useState(false)

    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    return <>
        <div className={'m-background' + mobileClass}></div>
        <div className={'m-popup-container' + mobileClass} ref={ref}>

            <span className={'m-popup-container-close' + mobileClass} onClick={_ => props.onClose()}><i className='fas fa-times'></i></span>
            <p className={'m-login-title' + mobileClass}>{loginMode ? 'Войти в аккаунт' : 'Регистрация'}</p>
            {loginMode && <Login />}
            {!loginMode && <Register />}
            <button className={'m-login-switch-button' + mobileClass} onClick={_ => setLoginMode(!loginMode)}>{loginMode ? 'Создать аккаунт' : 'Уже есть аккаунт?'}</button>
        </div>
    </>;
};

export default AuthWindow;
