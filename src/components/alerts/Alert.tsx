import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { clearAlerts } from '../../actions/alerts/alerts';
import { useOnClickOutside } from '../utils/HandleClickOutside';

export interface IAlertProps {
}

const Alert: React.FC = (props: IAlertProps) => {
    const dispatch = useDispatch();
    const [show, setShow] = React.useState(false)
    const alertsState = useSelector((state: RootStore) => state.alerts);

    React.useEffect(() => {
        if (alertsState.message != null) setShow(true)
        else setShow(false)
    }, [alertsState.message])

    const ref = React.useRef();
    useOnClickOutside(ref, () => dispatch(clearAlerts()));


    return (
        <>
            {show &&
                <div ref={ref} className='alerts-container'>
                    <div className='alert'>
                        <p>{alertsState.message}</p>
                    </div>
                </div>}
        </>
    );
}

export default Alert;
