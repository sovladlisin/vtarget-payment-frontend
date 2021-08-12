import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from '../../../actions/alerts/alerts';
import { createCabinet, deleteCabinet, updateCabinetMeta } from '../../../actions/cabinets/cabinets';
import { TCabinet } from '../../../actions/cabinets/types';
import { RootStore } from '../../../store';
import { useOnClickOutside } from '../../utils/HandleClickOutside';

interface ICabinetMetaFormProps {
    cabinet?: TCabinet,
    onClose: () => void
}

const CabinetMetaForm: React.FunctionComponent<ICabinetMetaFormProps> = (props) => {
    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth)
    const cabinetState = useSelector((state: RootStore) => state.cabinets)

    const [isDeleteWindow, setIsDeleteWindow] = React.useState(false)

    const [name, setName] = React.useState(props.cabinet ? props.cabinet.name : '')
    const [dayLimit, setDayLimit] = React.useState(props.cabinet ? props.cabinet.day_limit : 0)
    const [allLimit, setAllLimit] = React.useState(props.cabinet ? props.cabinet.all_limit : 0)


    const onSave = (e) => {
        e.preventDefault()


        if (props.cabinet) {
            const current_user_perms = props.cabinet.client_users.find(u => u.vk_id === authState.user.vk_profile.vk_id)
            if (current_user_perms.role != 2) {
                dispatch(createAlert({ type: "error", message: 'Нет прав на выполнение операции.' }))
                props.onClose()
            }
            else dispatch(updateCabinetMeta(props.cabinet.id, name, dayLimit, allLimit))
        }
        else {
            dispatch(createCabinet(name, dayLimit, allLimit))
        }
        props.onClose()
    }

    const onDelete = () => {
        dispatch(deleteCabinet(props.cabinet.id))
        props.onClose()
    }

    return <>
        <div className={'m-background' + mobileClass}></div>
        {!isDeleteWindow && <>
            <div className={'m-popup-container' + mobileClass} ref={ref}>
                <form onSubmit={onSave}>
                    <span onClick={_ => props.onClose()} className={'m-popup-container-close' + mobileClass}><i className='fas fa-times'></i></span>
                    <p className={'cab-window-title' + mobileClass}>{props.cabinet ? 'Изменить кабинет' : 'Создать кабинет'}</p>
                    <div className={'cab-create-cabinet-inputs' + mobileClass}>
                        <label>Название:</label>
                        <input required maxLength={60} value={name} onChange={e => setName(e.target.value)} ></input>
                        <label>Дневной лимит:</label>
                        <input value={dayLimit} onChange={e => setDayLimit(parseInt(e.target.value))} ></input>
                        <label>Общий лимит:</label>
                        <input value={allLimit} onChange={e => setAllLimit(parseInt(e.target.value))}></input>
                    </div>
                    <button className={'cab-create-cabinet-confirm' + mobileClass} onClick={onSave}>{props.cabinet ? 'Изменить кабинет' : 'Создать кабинет'}</button>
                    {props.cabinet && <button className={'cab-create-cabinet-delete' + mobileClass} onClick={e => { e.preventDefault(); setIsDeleteWindow(true) }}>Удалить кабинет</button>}
                </form>

            </div>
        </>}
        {isDeleteWindow && <>
            <div className={'m-popup-container' + mobileClass} ref={ref}>
                <p className={'cab-delete-cabinet-title' + mobileClass}>Удалить кабинет?</p>
                <p className={'cab-delete-cabinet-description' + mobileClass}>Пожалуйста, подтвердите удаление кабинета.</p>
                <button className={'cab-delete-cabinet-delete-button' + mobileClass} onClick={onDelete}>Удалить</button>
                <button className={'cab-delete-cabinet-cancel-button' + mobileClass} onClick={_ => setIsDeleteWindow(false)}>Отменить</button>
            </div>
        </>}

    </>;
};

export default CabinetMetaForm;
