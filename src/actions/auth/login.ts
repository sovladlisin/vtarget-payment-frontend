import { Dispatch } from "react";
import { SERVER_URL, URL } from "../../utils";
import { ACCEPT_SERVICE_REQUEST, ACTIVATE_PHOTOSTOCK_ACCOUNT, APPLY_SERVICE_REQUEST, AuthDispatchTypes, CONNECT_SHUTTERSTOCK_TOKEN, CREATE_PHOTOSTOCK_ACCOUNT, DELETE_PHOTOSTOCK_ACCOUNT, DENY_SERVICE_REQUEST, DISCONNECT_SHUTTERSTOCK_TOKEN, EDIT_PHOTOSTOCK_ACCOUNT, EDIT_SERVICE_INFO, GET_ALL_USERS, GET_PHOTOSTOCK_ACCOUNTS, GET_PHOTO_DOWNLOAD_RECORDS, GET_SERVICE_INFO, GET_SERVICE_REQUESTS, GET_USER_MEDALS, LOGIN, LOGOUT, PHOTO_BAN_USER, SHUTTERSTOCK_TOKEN_CHECK, TOGGLE_USER_ADMIN_ROLE, TPhotostockAccount, TServiceInfo, TUser } from "./types";
import axios from "axios";
import { CREATE_ALERT } from "../alerts/types";


export const login = () => (dispatch: Dispatch<AuthDispatchTypes>) => {


    const client_id = '7613764'
    // const client_id = '7647471'

    var redirect_uri = "https://oauth.vk.com/authorize?client_id=" + client_id + "&display=page&redirect_uri=" + URL + "&scope=wall,groups,notify,ads,offline&response_type=token&v=5.122"

    // var redirect_uri = 'https://oauth.vk.com/authorize?client_id=' + client_id + '&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=offline,wall&response_type=token&v=5.124'
    window.location.replace(redirect_uri);
}



export const extractToken = () => (dispatch: Dispatch<AuthDispatchTypes>) => {
    // var href = window.location.href
    // var data = href.split("?code=")[1]

    // const code = data


    var href = window.location.href
    var data = href.split("#access_token=")[1].split('&expires_in=')
    var data2 = data[1].split('&user_id=')[1]

    const access_token = data[0]
    const user_id = data2

    const body = JSON.stringify({ user_id: user_id, access_token: access_token })
    console.log(body)
    axios.post(SERVER_URL + 'api/auth/login', body).then(res => {
        dispatch({
            type: LOGIN,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
        // window.location.replace(URL);
    })
}

export const logout = () => (dispatch: Dispatch<AuthDispatchTypes>) => {
    dispatch({
        type: LOGOUT
    })
}

export const getAllUsers = (admin_pk: number) => (dispatch: Dispatch<AuthDispatchTypes>) => {

    axios.post(SERVER_URL + 'api/auth/getAllUsers', JSON.stringify({ admin_pk })).then(res => {
        dispatch({
            type: GET_ALL_USERS,
            payload: res.data
        })
    })
}

