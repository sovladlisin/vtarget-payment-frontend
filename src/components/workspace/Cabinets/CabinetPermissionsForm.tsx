import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from '../../../actions/alerts/alerts';
import { getUserInfo, updateCabinetPermissions } from '../../../actions/cabinets/cabinets';
import { TCabinet, TCabinetUser } from '../../../actions/cabinets/types';
import { RootStore } from '../../../store';
import { useOnClickOutside } from '../../utils/HandleClickOutside';

interface ICabinetPermissionsFormProps {
    cabinet: TCabinet,
    onClose: () => void
}

const CabinetPermissionsForm: React.FunctionComponent<ICabinetPermissionsFormProps> = (props) => {

    const [localPermissions, setLocalPermissions] = React.useState<TCabinetUser[]>(props.cabinet.client_users)

    const [mobileClass, setMobileClass] = React.useState(isMobile ? ' mobile' : '')
    React.useEffect(() => { setMobileClass(isMobile ? ' mobile' : '') }, [isMobile])

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth)
    const cabinetState = useSelector((state: RootStore) => state.cabinets)


    const current_user: TCabinetUser = props.cabinet.client_users.find(u => u.vk_id === authState.user.vk_profile.vk_id)

    const [userVkLink, setUserVkLink] = React.useState('')
    const addUser = () => {
        var link = ''
        link = userVkLink.split('/')[3]
        if (link[0] + link[1] === 'id') {
            link = link.substring(2)
        }
        setUserVkLink(link)
        dispatch(getUserInfo(link))
    }

    React.useEffect(() => {
        const user_info = cabinetState.selected_vk_user
        if (user_info && user_info.link === userVkLink) {
            !localPermissions.find(u => u.vk_id === user_info.user.vk_id) && setLocalPermissions([...localPermissions, user_info.user])
            setUserVkLink('')
        }
    }, [cabinetState.selected_vk_user])

    const onSave = () => {
        const current_user_perms = props.cabinet.client_users.find(u => u.vk_id === authState.user.vk_profile.vk_id)
        if (current_user_perms.role === 0)
            dispatch(createAlert({ type: "error", message: 'Нет прав на выполнение операции.' }))
        else
            dispatch(updateCabinetPermissions(props.cabinet.id, localPermissions))
        props.onClose()

    }

    const getRole = (i: number) => {
        switch (i) {
            case 0:
                return 'Наблюдатель'
            case 1:
                return 'Менеджер'
            case 2:
                return 'Владелец'
        }
        return ''
    }

    return <>
        <div className={'m-background' + mobileClass}></div>

        <div className={'m-popup-container' + mobileClass} ref={ref}>
            <span onClick={_ => props.onClose()} className={'m-popup-container-close' + mobileClass}><i className='fas fa-times'></i></span>
            <p className={'cab-window-title' + mobileClass}>Доступы к кабинету</p>

            <div className={'cab-create-cabinet-access-list' + mobileClass}>
                <div className={'cab-create-cabinet-access-list-item-owner' + mobileClass}>
                    <img src={current_user.photo}></img>
                    <p className={'cab-create-cabinet-access-list-item-name' + mobileClass}>{current_user.name}</p>
                    <p className={'cab-create-cabinet-access-list-item-role' + mobileClass}>{getRole(current_user.role)}</p>
                </div>
                {localPermissions.filter(user => user.vk_id != authState.user.vk_profile.vk_id).map(user => {
                    return <>
                        <div className={'cab-create-cabinet-access-list-item-user' + mobileClass}>
                            <img src={user.photo}></img>
                            <p className={'cab-create-cabinet-access-list-item-name' + mobileClass}>{user.name}</p>

                            <button className={'cab-create-cabinet-access-list-item-delete' + mobileClass} onClick={_ => {
                                setLocalPermissions(localPermissions.filter(u => u.vk_id != user.vk_id))
                            }}><i className='fas fa-times'></i></button>
                            <select value={user.role} onChange={e =>
                                setLocalPermissions(localPermissions.map(u => u.vk_id != user.vk_id ? u : { ...u, role: parseInt(e.target.value) }))
                            }>
                                <option value={1}>Менеджер</option>
                                <option value={0}>Наблюдатель</option>
                            </select>

                        </div>
                    </>
                })}
            </div>
            <div className={'cab-create-cabinet-access-list-input-container' + mobileClass}>
                <input placeholder='Ссылка на профиль в ВК' onChange={e => setUserVkLink(e.target.value)} value={userVkLink}></input>
                <button onClick={addUser}><i className='fas fa-plus'></i></button>
            </div>
            <button className={'cab-create-cabinet-confirm' + mobileClass} onClick={onSave}>Подтвердить</button>
        </div>
    </>;
};

export default CabinetPermissionsForm;
