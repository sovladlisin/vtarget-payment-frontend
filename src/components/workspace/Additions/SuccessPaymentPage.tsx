import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom'
interface ISuccessPaymentPageProps {
}

const SuccessPaymentPage: React.FunctionComponent<ISuccessPaymentPageProps> = (props) => {

    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    return <>
        <div className={'redirect-container' + mobileClass}>
            <div className={'redirect-container-icon-container bg-green' + mobileClass}>
                <i className='fas fa-check'></i>
            </div>
            <p className={'redirect-container-title' + mobileClass}>Платеж выполнен успешно.</p>
            <Link to='/workspace'><div className={'redirect-container-link color-blue' + mobileClass}>Перейти в рабочий кабинет</div></Link>
        </div>
    </>;
};

export default SuccessPaymentPage;
