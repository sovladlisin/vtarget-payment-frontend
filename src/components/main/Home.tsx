import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { URL } from '../../utils';
import { extractToken, login, logout } from '../../actions/auth/login'
import Background from '../../images/background.jpg'
import MainLogo from '../../images/logo.png'
import ManNotebook from '../../images/manNotebook.jpg'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Login from '../auth/Login';
import { useRef } from 'react';
export interface IAppProps {
}

const Home: React.FC = (props: IAppProps) => {
    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth);

    React.useEffect(() => {
        var href: string = window.location.href
        href = href.split('/').pop()
        if (href.length > 30)
            dispatch(extractToken())

    }, [])

    const [isLoginWindow, setIsLoginWindow] = useState(false)

    const cardsRef = useRef(null)
    const paymentRef = useRef(null)
    const contactRef = useRef(null)
    const scrollToCards = () => cardsRef.current.scrollIntoView({ behavior: 'smooth' })
    const scrollToPayment = () => paymentRef.current.scrollIntoView({ behavior: 'smooth' })
    const scrollToContact = () => contactRef.current.scrollIntoView({ behavior: 'smooth' })

    return <>
        <div className='m-home'>

            {!isMobile && <>
                <div className='m-home-header'>
                    <div className="m-home-logo" style={{ backgroundImage: 'url("' + MainLogo + '")' }}></div>


                    <div className='m-home-navigation'>
                        <button onClick={scrollToCards}>Преймущества</button>
                        <button>Способы получения</button>
                        <button onClick={scrollToContact}>Контакты</button>
                    </div>

                    <div className='m-home-header-account'>
                        {authState.user.token ? <>
                            <img src={authState.user.user_img}></img>
                            <Link to='/workspace'>Личный кабинет</Link>
                            <button className='m-home-header-account-logout' title={'Выход'} onClick={_ => dispatch(logout())}><i className="fas fa-sign-out-alt"></i></button>
                        </> : <>
                            <button onClick={_ => setIsLoginWindow(true)}>Войти в аккаунт</button>
                        </>}
                    </div>
                </div>


                <div className='m-home-greeting-card' >
                    <div className='m-home-greeting-card-left'>
                        <p className='m-home-greeting-card-h1'>Удобное и выгодное пополнение <span>рекламных</span> кабинетов</p>
                        <p className='m-home-greeting-card-h2'>Пополняй баланс в кабинете в пару кликов и получай подробную статистику кампаний и объявлений </p>
                        <div className='m-home-greeting-card-email-input'>
                            <input placeholder='Введите почту, чтобы начать'></input>
                            <button><i className='fas fa-chevron-right'></i></button>
                        </div>
                        <div className='m-home-greeting-card-rules'>
                            <p>Нажимая "Зарегистрироваться", вы соглашаетесь с <a>Условиями, Политикой безопасности</a> и подтверждаете свое согласие на обработку персональных данных</p>
                        </div>

                    </div>

                    <div className='m-home-greeting-card-right'>
                        <div className="m-home-man-notebook" style={{ backgroundImage: 'url("' + ManNotebook + '")' }}></div>
                    </div>

                </div>

                <span ref={cardsRef}></span>
                <div className='m-home-info-cards' >
                    <div className='m-home-card'>
                        <div className='m-home-card-logo'>
                            <i className='far fa-credit-card'></i>
                        </div>
                        <p className='m-home-card-title'>Статистика</p>
                        <p className='m-home-card-description'>Прозрачная финансовая статистика и показатели эффективности рекламных кампаний отображается в одном месте. Вы всегда знаете сколько денег пришло, когда и куда ушло, а так же можете выгрузить всю необходимую информацию в удобном формат</p>
                    </div>
                    <div className='m-home-card'>
                        <div className='m-home-card-logo'>
                            <i className='far fa-credit-card'></i>
                        </div>
                        <p className='m-home-card-title'>Быстрое пополнение</p>
                        <p className='m-home-card-description'>Для физических и юридических лиц, а так же индивидуальных предпринимателей. Мгновенно через сайт или с договором, счётом и закрывающими документами (для налоговой) </p>
                    </div>
                    <div className='m-home-card'>
                        <div className='m-home-card-logo'>
                            <i className='far fa-credit-card'></i>
                        </div>
                        <p className='m-home-card-title'>Модерация</p>
                        <p className='m-home-card-description'>Мы знаем частые причины отклонений рекламных объявлений и помогаем их избежать. А ещё нас любят агенты поддержки и отвечают гораздо быстрее. Проверку мы проходим согласном общим правилам рекламных сетей </p>
                    </div>
                    <div className='m-home-card'>
                        <div className='m-home-card-logo'>
                            <i className='far fa-credit-card'></i>
                        </div>
                        <p className='m-home-card-title'>Конфиденциальность</p>
                        <p className='m-home-card-description'>Любые рекламные кампании, креативы, суммы пополнений и размер бонуса является конфиденциальной информацией, недоступной для третьих лиц </p>
                    </div>
                    <div className='m-home-card'>
                        <div className='m-home-card-logo'>
                            <i className='far fa-credit-card'></i>
                        </div>
                        <p className='m-home-card-title'>История пополнений</p>
                        <p className='m-home-card-description'>Сервис хранит детальную историю всех пополнений. Автоматические стратегии управления ставками </p>
                    </div>
                    <div className='m-home-card'>
                        <div className='m-home-card-logo'>
                            <i className='far fa-credit-card'></i>
                        </div>
                        <p className='m-home-card-title'>Аналитика</p>
                        <p className='m-home-card-description'>Статистика рекламного кабинета с разбивкой по 15 минут. Расчет стоимости регистрации для Senler.ru. Скачивает подписчиков по гипотезам и тегам для дальнейшего анализа. Генерация ссылок с utm-метками для сайтов и рассыльщиков. Экспорт отчетов в Excel в с любыми данными </p>
                    </div>
                </div>

                <div className='m-home-cards-separator'>
                    <div className='m-home-cards-separator-text'>Начните выгодно пополнять рекламные кампании в интернете</div>
                    <button>Начать работу <i className='fas fa-chevron-right'></i></button>
                </div>


                <span ref={contactRef}></span>

                <div className='m-home-footer'>
                    <div id='wave'>
                        <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                            <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style={{ stroke: 'none', fill: '#0d253c' }}></path>
                        </svg>
                    </div>

                    <div className='m-home-footer-main'>
                        <div className='m-home-footer-left'>
                            <div className='m-home-footer-left-top'>
                                <p className='m-home-footer-left-top-title'>Остались вопросы?</p>
                                <p className='m-home-footer-left-top-title-2'>Свяжитесь с нами лично!</p>
                            </div>
                            <div className='m-home-footer-left-bottom'>
                                <p className='m-home-footer-left-bottom-phone'>
                                    <i className='fas fa-phone'></i>
                                    <p>{'+7 (913) 068-62-92'}</p>
                                </p>
                                <p className='m-home-footer-left-bottom-email'>
                                    <i className='far fa-envelope'></i>
                                    <p>servicepopolnenia@info.ru</p>
                                </p>
                            </div>
                        </div>
                        <div className='m-home-footer-right'>
                            <div className='m-home-footer-right-inputs'>
                                <input placeholder='Электронная почта'></input>
                                <input placeholder='Номер телефона'></input>
                                <textarea placeholder='Сообщение'></textarea>
                            </div>
                            <div className='m-home-footer-right-bottom'>
                                <div className='m-home-footer-right-rules'>
                                    <p>Нажимая "Зарегистрироваться", вы соглашаетесь с <a>Условиями, Политикой безопасности</a> и подтверждаете свое согласие на обработку персональных данных</p>
                                </div>
                                <button><i className='fas fa-chevron-right'></i></button>
                            </div>

                        </div>
                    </div>
                    <div className='m-home-footer-bottom-logo'>
                        <p className='m-home-footer-bottom-logo-company-name'>ООО "ВТаргете"</p>
                        <p className='m-home-footer-bottom-logo-company-address'>Москва 2021</p>
                    </div>
                </div>
            </>}





            {isMobile && <>

            </>}

        </div>

        {isLoginWindow && <Login onClose={() => setIsLoginWindow(false)} />}
    </>
}

export default Home
