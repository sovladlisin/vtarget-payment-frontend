import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { clearAlerts } from '../../actions/alerts/alerts';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { TAlert } from '../../actions/alerts/types';

export interface IAlertProps {
}

const Alert: React.FC = (props: IAlertProps) => {
    const dispatch = useDispatch();
    const [show, setShow] = React.useState(false)
    const alertsState = useSelector((state: RootStore) => state.alerts);

    const ref = React.useRef();
    useOnClickOutside(ref, () => dispatch(clearAlerts()));


    const getAlertIcon = (alert: TAlert) => {
        switch (alert.type) {
            case 'error':
                return <i className='fas fa-exclamation-circle color-red'></i>
            case 'notification':
                return <i className='fas fa-flag color-blue' ></i>
            case 'success':
                return <i className='fas fa-check-circle color-green'></i>
            case 'warning':
                return <i className='fas fa-exclamation-triangle color-yellow'></i>
        }
    }

    return (
        <>

            <div ref={ref} className='alerts-container'>
                {alertsState.alerts.map(alert => {
                    return <div className='alert'>
                        <span>{getAlertIcon(alert)}</span>
                        <p>{alert.message}</p>
                    </div>
                })}

            </div>
        </>
    );
}

export default Alert;
