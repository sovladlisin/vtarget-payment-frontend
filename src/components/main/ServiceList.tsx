import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { extractToken } from '../../actions/auth/login';
import authReducer from '../../reducers/auth/login';
import { RootStore } from '../../store';
import { URL } from '../../utils';

interface IServiceListProps {
}


const ServiceList: React.FC<IServiceListProps> = (props) => {

    const dispatch = useDispatch()
    const userState = useSelector((state: RootStore) => state.auth)
    React.useEffect(() => {
        var href: string = window.location.href
        href = href.replace(URL, '')
        if (href.length > 30) {
            dispatch(extractToken())
        } else {
            if (!userState.user.token) window.location.replace(URL);
        }
    }, [])

    useEffect(() => {

        const data = { 'from': 1, 'to': 50 }
        const body = JSON.stringify(data)
        axios.post('http://ml.vtargete.ru/certificates/' + `api/get_clusters`, body).then(res => {
            console.log(res)
        })
    }, [])


    return <></>

};

export default ServiceList;
