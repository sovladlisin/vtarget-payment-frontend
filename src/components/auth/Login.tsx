import * as React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth/login';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import VkLogo from '../../images/vk.svg'

interface ILoginProps {
    onClose: () => void
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    const dispatch = useDispatch()

    const ref = useRef()
    useOnClickOutside(ref, () => props.onClose())

    return <>
        <div className='m-background'></div>
        <div className='m-popup-container' ref={ref}>
            <span className='m-popup-container-close' onClick={_ => props.onClose()}><i className='fas fa-times'></i></span>
            <p className='m-login-title'>Войти в аккаунт</p>
            <button className='m-login-vk-login' onClick={() => dispatch(login())}>
                <span style={{ backgroundImage: 'url("' + VkLogo + '")' }} className='m-login-vk-logo'></span>
                <span className='m-login-vk-text'>Войти через ВКонтакте</span>
            </button>
        </div>
    </>;
};

export default Login;
