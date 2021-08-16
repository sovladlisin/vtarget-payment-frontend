import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { URL } from '../../utils';
import { extractToken, logout } from '../../actions/auth/login'
import Background from '../../images/background.jpg'
import MainLogo from '../../images/logo.png'
import ManNotebook from '../../images/manNotebook.jpg'
import ManNotebookMobile from '../../images/manNotebookMobile.jpg'
import UserLogoDefault from '../../images/userLogoDefault.png'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Login from '../auth/Login';
import { useRef } from 'react';
import Register from '../auth/Register';
import AuthWindow from '../auth/AuthWindow';
export interface IAppProps {
}

const Home: React.FC = (props: IAppProps) => {
    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth);

    React.useEffect(() => {
        // var href: string = window.location.href
        // href = href.split('/').pop()
        // console.log(href)
        // if (href.length > 30)
        //     dispatch(extractToken())

    }, [])

    const [isLoginWindow, setIsLoginWindow] = useState(false)
    const [isRegisterWindow, setIsRegisterWindow] = useState(false)
    const cardsRef = useRef(null)
    const paymentRef = useRef(null)
    const contactRef = useRef(null)
    const scrollToCards = () => cardsRef.current.scrollIntoView({ behavior: 'smooth' })
    const scrollToPayment = () => paymentRef.current.scrollIntoView({ behavior: 'smooth' })
    const scrollToContact = () => contactRef.current.scrollIntoView({ behavior: 'smooth' })

    const [mobileClass, setMobileClass] = useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    const [loginEmail, setLoginEmail] = useState('')
    const [loginBufferEmail, setLoginBufferEmail] = useState('')

    const onEnterSubmit = (e) => {
        e.preventDefault()
        if (authState.user.is_online) {
            window.location.replace(URL + 'workspace_menu/')
        }
        else {
            setLoginEmail(loginBufferEmail)
            setIsRegisterWindow(true)
        }
    }

    const closeAuthWindows = () => {
        setLoginEmail('')
        setIsRegisterWindow(false)
        setIsLoginWindow(false)
    }

    const onStartClick = () => {
        if (authState.user.is_online) {
            window.location.replace(URL + 'workspace_menu/')
        }
        else {
            setIsRegisterWindow(true)
        }
    }

    return <>
        <div className='m-home'>


            <div className={'m-home-header' + mobileClass}>
                <div className={'m-home-logo' + mobileClass} style={{ backgroundImage: 'url("' + MainLogo + '")' }}></div>


                <div className={'m-home-navigation' + mobileClass}>
                    <button onClick={scrollToCards}>Преимущества</button>
                    <button>Способы получения</button>
                    <button onClick={scrollToContact}>Контакты</button>
                </div>

                <div className={'m-home-header-account' + mobileClass}>
                    {authState.user.token ? <>
                        <img src={authState.user.vk_profile ? authState.user.vk_profile.photo : 'http://mymbs.co.id/public/upload/image/user/user.png'}></img>
                        <Link to='/workspace_menu'>Личный кабинет</Link>
                        <button className={'m-home-header-account-logout' + mobileClass} title={'Выход' + mobileClass} onClick={_ => dispatch(logout())}><i className="fas fa-sign-out-alt"></i></button>
                    </> : <>
                        <button onClick={_ => setIsLoginWindow(true)}>Войти в аккаунт</button>
                    </>}
                </div>
            </div>


            <div className={'m-home-greeting-card' + mobileClass} >
                <div className={'m-home-greeting-card-left' + mobileClass}>
                    <p className={'m-home-greeting-card-h1' + mobileClass}>Удобное и выгодное пополнение <span>рекламных</span> кабинетов</p>
                    <p className={'m-home-greeting-card-h2' + mobileClass}>Пополняй баланс в кабинете в пару кликов и получай подробную статистику кампаний и объявлений </p>
                    <div className={'m-home-greeting-card-email-input' + mobileClass}>
                        <form onSubmit={onEnterSubmit}>
                            <input required type={'email'} placeholder='Введите почту, чтобы начать' value={loginBufferEmail} onChange={e => setLoginBufferEmail(e.target.value)}></input>
                            <button><i className='fas fa-chevron-right'></i></button>
                        </form>
                    </div>
                    <div className={'m-home-greeting-card-rules' + mobileClass}>
                        <p>Нажимая "Зарегистрироваться", вы соглашаетесь с <a>Условиями, Политикой безопасности</a> и подтверждаете свое согласие на обработку персональных данных</p>
                    </div>

                </div>

                <div className={'m-home-greeting-card-right' + mobileClass}>
                    <div className={'m-home-man-notebook' + mobileClass} style={{ backgroundImage: 'url("' + (isMobile ? ManNotebookMobile : ManNotebook) + '")' }}></div>
                </div>

            </div>

            <span ref={cardsRef}></span>
            <div className={'m-home-info-cards' + mobileClass} >
                <div className={'m-home-card' + mobileClass}>
                    <div className={'m-home-card-logo' + mobileClass}>
                        <i className="fas fa-chart-line"></i>
                    </div>
                    <p className={'m-home-card-title' + mobileClass}>Статистика</p>
                    <p className={'m-home-card-description' + mobileClass}>Прозрачная финансовая статистика и показатели эффективности рекламных кампаний отображается в одном месте. Вы всегда знаете сколько денег пришло, когда и куда ушло, а так же можете выгрузить всю необходимую информацию в удобном формат</p>
                </div>
                <div className={'m-home-card' + mobileClass}>
                    <div className={'m-home-card-logo' + mobileClass}>
                        <i className='far fa-credit-card'></i>
                    </div>
                    <p className={'m-home-card-title' + mobileClass}>Быстрое пополнение</p>
                    <p className={'m-home-card-description' + mobileClass}>Для физических и юридических лиц, а так же индивидуальных предпринимателей. Мгновенно через сайт или с договором, счётом и закрывающими документами (для налоговой) </p>
                </div>
                <div className={'m-home-card' + mobileClass}>
                    <div className={'m-home-card-logo' + mobileClass}>
                        <i className="fas fa-user-shield"></i>
                    </div>
                    <p className={'m-home-card-title' + mobileClass}>Модерация</p>
                    <p className={'m-home-card-description' + mobileClass}>Мы знаем частые причины отклонений рекламных объявлений и помогаем их избежать. А ещё нас любят агенты поддержки и отвечают гораздо быстрее. Проверку мы проходим согласном общим правилам рекламных сетей </p>
                </div>
                <div className={'m-home-card' + mobileClass}>
                    <div className={'m-home-card-logo' + mobileClass}>
                        <i className="fas fa-unlock-alt"></i>
                    </div>
                    <p className={'m-home-card-title' + mobileClass}>Конфиденциальность</p>
                    <p className={'m-home-card-description' + mobileClass}>Любые рекламные кампании, креативы, суммы пополнений и размер бонуса является конфиденциальной информацией, недоступной для третьих лиц </p>
                </div>
                <div className={'m-home-card' + mobileClass}>
                    <div className={'m-home-card-logo' + mobileClass}>
                        <i className="fas fa-history"></i>
                    </div>
                    <p className={'m-home-card-title' + mobileClass}>История пополнений</p>
                    <p className={'m-home-card-description' + mobileClass}>Сервис хранит детальную историю всех пополнений. Автоматические стратегии управления ставками </p>
                </div>
                <div className={'m-home-card' + mobileClass}>
                    <div className={'m-home-card-logo' + mobileClass}>
                        <i className="fas fa-chart-pie"></i>
                    </div>
                    <p className={'m-home-card-title' + mobileClass}>Аналитика</p>
                    <p className={'m-home-card-description' + mobileClass}>Статистика рекламного кабинета с разбивкой по 15 минут. Расчет стоимости регистрации для Senler.ru. Скачивает подписчиков по гипотезам и тегам для дальнейшего анализа. Генерация ссылок с utm-метками для сайтов и рассыльщиков. Экспорт отчетов в Excel в с любыми данными </p>
                </div>
            </div>

            <div className={'m-home-cards-separator' + mobileClass}>
                <div className={'m-home-cards-separator-text' + mobileClass}>Начните выгодно пополнять рекламные кампании в интернете</div>
                <button onClick={onStartClick}>Начать работу <i className='fas fa-chevron-right'></i></button>
            </div>


            <span ref={contactRef}></span>

            <div className={'m-home-footer' + mobileClass}>
                <div id='wave'>
                    <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                        <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style={{ stroke: 'none', fill: '#0d253c' }}></path>
                    </svg>
                </div>

                <div className={'m-home-footer-main' + mobileClass}>
                    <div className={'m-home-footer-left' + mobileClass}>
                        <div className={'m-home-footer-left-top' + mobileClass}>
                            <p className={'m-home-footer-left-top-title' + mobileClass}>Остались вопросы?</p>
                            <p className={'m-home-footer-left-top-title-2' + mobileClass}>Свяжитесь с нами лично!</p>
                        </div>
                        <div className={'m-home-footer-left-bottom' + mobileClass}>
                            <p className={'m-home-footer-left-bottom-phone' + mobileClass}>
                                <i className='fas fa-phone'></i>
                                <p>{'+7 (913) 068-62-92' + mobileClass}</p>
                            </p>
                            <p className={'m-home-footer-left-bottom-email' + mobileClass}>
                                <i className='far fa-envelope'></i>
                                <p>servicepopolnenia@info.ru</p>
                            </p>
                        </div>
                    </div>
                    <div className={'m-home-footer-right' + mobileClass}>
                        <div className={'m-home-footer-right-inputs' + mobileClass}>
                            <input placeholder='Электронная почта'></input>
                            <input placeholder='Номер телефона'></input>
                            <textarea placeholder='Сообщение'></textarea>
                        </div>
                        <div className={'m-home-footer-right-bottom' + mobileClass}>
                            <div className={'m-home-footer-right-rules' + mobileClass}>
                                <p>Нажимая "Зарегистрироваться", вы соглашаетесь с <a>Условиями, Политикой безопасности</a> и подтверждаете свое согласие на обработку персональных данных</p>
                            </div>
                            <button><i className='fas fa-chevron-right'></i></button>
                        </div>

                    </div>
                </div>
                <div className={'m-home-footer-bottom-logo' + mobileClass}>
                    <p className={'m-home-footer-bottom-logo-company-name' + mobileClass}>ООО "ВТаргете"</p>
                    <p className={'m-home-footer-bottom-logo-company-address' + mobileClass}>Москва 2021</p>
                </div>
            </div>


        </div>

        {isLoginWindow && <AuthWindow loginEmail={loginEmail.length > 0 ? loginEmail : null} loginMode={true} onClose={closeAuthWindows} />}
        {isRegisterWindow && <AuthWindow loginEmail={loginEmail.length > 0 ? loginEmail : null} loginMode={false} onClose={closeAuthWindows} />}
    </>
}

export default Home
