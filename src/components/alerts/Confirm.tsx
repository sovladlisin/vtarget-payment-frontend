import * as React from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface IConfirmProps {
    onSubmit: () => void
    onCancel: () => void
    message: string
}

const Confirm: React.FunctionComponent<IConfirmProps> = (props) => {
    const ref = React.useRef()
    useOnClickOutside(ref, () => {
        props.onCancel()
    })
    return <>
        <div className='core-submit-window' ref={ref}>
            <i className="fas fa-exclamation-triangle"></i>
            <p>{props.message}</p>
            <div>
                <button style={{ background: '#529652' }} onClick={_ => { props.onSubmit(); props.onCancel() }}>Подтвердить</button>
                <button style={{ background: '#e73e3e' }} onClick={_ => props.onCancel()}>Отмена</button>
            </div>
        </div>
    </>;
};

export default Confirm;
