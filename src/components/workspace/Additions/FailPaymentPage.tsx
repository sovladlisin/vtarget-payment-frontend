import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom'

interface IFailPaymentPageProps {
}

const FailPaymentPage: React.FunctionComponent<IFailPaymentPageProps> = (props) => {
    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    return <>
        <div className={'redirect-container' + mobileClass}>
            <div className={'redirect-container-icon-container bg-red' + mobileClass}>
                <i className='fas fa-times'></i>
            </div>
            <p className={'redirect-container-title' + mobileClass}>Платеж отменен.</p>
            <Link to='/workspace'><div className={'redirect-container-link color-blue' + mobileClass}>Перейти в рабочий кабинет</div></Link>
        </div>
    </>;
};

export default FailPaymentPage;
