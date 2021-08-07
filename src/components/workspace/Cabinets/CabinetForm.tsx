import * as React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCabinet, deleteCabinet, updateCabinet } from '../../../actions/cabinets/cabinets';
import { TCabinet, TCabinetUser } from '../../../actions/cabinets/types';
import { RootStore } from '../../../store';
import { performVkRequest } from '../../../utils';
import { useOnClickOutside } from '../../utils/HandleClickOutside';

interface ICabinetFormProps {
    onClose: () => void,
    cabinet?: TCabinet
}

const CabinetForm: React.FunctionComponent<ICabinetFormProps> = (props) => {

    const ref = useRef()
    useOnClickOutside(ref, () => props.onClose())

    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth)

    const [isDeleteWindow, setIsDeleteWindow] = useState(false)

    const [userList, setUserList] = useState<{ id: number, name: string, role: number, photo: string }[]>([])
    const [newCabinet, setNewCabinet] = useState<TCabinet>(props.cabinet ? props.cabinet : { account_id: 1, name: '', user_accounts: [], admin_id: authState.user.id })

    const [userVkLink, setUserVkLink] = useState('')
    const addUser = () => {
        var link = ''
        link = userVkLink.split('/')[3]
        if (link[0] + link[1] === 'id') {
            link = link.substring(2)
        }
        setUserVkLink('')
        performVkRequest('get', 'users.get', { 'user_ids': link, 'fields': 'photo_200' }, authState.user.token, '5.124').then(res => {
            const data = res.data['response'][0]
            const new_user: TCabinetUser = {
                vk_id: data['id'],
                name: data['first_name'] + ' ' + data['last_name'],
                role: 0,
                photo: data['photo_200']
            }
            !newCabinet.user_accounts.find(u => u.vk_id === new_user.vk_id) && setNewCabinet({ ...newCabinet, user_accounts: [...newCabinet.user_accounts, new_user] })
        })



    }

    const onSave = () => {
        props.cabinet ? dispatch(updateCabinet(newCabinet)) : dispatch(createCabinet(newCabinet))
        props.onClose()
    }

    const onDelete = () => {
        dispatch(deleteCabinet(props.cabinet.id))
        props.onClose()
    }

    return <>
        <div className='m-background'></div>
        {!isDeleteWindow && <>
            <div className='m-popup-container' ref={ref}>
                <span onClick={_ => props.onClose()} className='m-popup-container-close'><i className='fas fa-times'></i></span>
                <div className='cab-create-cabinet-inputs'>
                    <label>Название:</label>
                    <input value={newCabinet.name} onChange={e => setNewCabinet({ ...newCabinet, name: e.target.value })} ></input>
                    <label>Дневной лимит:</label>
                    <input value={newCabinet.day_limit} onChange={e => setNewCabinet({ ...newCabinet, day_limit: parseInt(e.target.value) })} ></input>
                    <label>Общий лимит:</label>
                    <input value={newCabinet.all_limit} onChange={e => setNewCabinet({ ...newCabinet, all_limit: parseInt(e.target.value) })}></input>
                </div>
                <p className='cab-create-container-access-list-title'>Доступ к кабинету:</p>
                <div className='cab-create-cabinet-access-list'>
                    <div className='cab-create-cabinet-access-list-item-owner'>
                        <img src={authState.user.user_img}></img>
                        <p className='cab-create-cabinet-access-list-item-name'>{authState.user.user_name}</p>
                        <p className='cab-create-cabinet-access-list-item-role'>Владелец</p>
                    </div>
                    {newCabinet.user_accounts.map(user => {
                        return <>
                            <div className='cab-create-cabinet-access-list-item-user'>
                                <img src={user.photo}></img>
                                <p className='cab-create-cabinet-access-list-item-name'>{user.name}</p>

                                <button className='cab-create-cabinet-access-list-item-delete' onClick={_ => {
                                    setNewCabinet({ ...newCabinet, user_accounts: newCabinet.user_accounts.filter(a => a.vk_id != user.vk_id) })
                                }}><i className='fas fa-times'></i></button>
                                <select value={user.role} onChange={e =>
                                    setNewCabinet({ ...newCabinet, user_accounts: newCabinet.user_accounts.map(u => u.vk_id === user.vk_id ? { ...u, role: parseInt(e.target.value) } : u) })
                                }>
                                    <option value={1}>Владелец</option>
                                    <option value={0}>Наблюдатель</option>
                                </select>

                            </div>
                        </>
                    })}
                </div>
                <div className='cab-create-cabinet-access-list-input-container'>
                    <input placeholder='Ссылка на профиль в ВК' onChange={e => setUserVkLink(e.target.value)} value={userVkLink}></input>
                    <button onClick={addUser}><i className='fas fa-plus'></i></button>
                </div>
                <button className='cab-create-cabinet-confirm' onClick={onSave}>Подтвердить</button>
                {props.cabinet && <button className='cab-create-cabinet-delete' onClick={_ => setIsDeleteWindow(true)}>Удалить кабинет</button>}
            </div>
        </>}
        {isDeleteWindow && <>
            <div className='m-popup-container' ref={ref}>
                <p className='cab-delete-cabinet-title'>Удалить кабинет?</p>
                <p className='cab-delete-cabinet-description'>Пожалуйста, подтвердите удаление кабинета.</p>
                <button className='cab-delete-cabinet-delete-button' onClick={onDelete}>Удалить</button>
                <button className='cab-delete-cabinet-cancel-button' onClick={_ => setIsDeleteWindow(false)}>Отменить</button>
            </div>
        </>}


    </>;
};

export default CabinetForm;
