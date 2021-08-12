import { Dispatch } from "react";
import { SERVER_URL, URL } from "../../utils";
import { AuthDispatchTypes, GET_ALL_USERS, LOGIN, LOGOUT, TUser, UPDATE_VK_PROFILE } from "./types";
import axios from "axios";
import { CREATE_ALERT } from "../alerts/types";
import store from "../../store";



export const connectVkAccount = () => (dispatch: Dispatch<AuthDispatchTypes>) => {


    const client_id = '7613764'
    // const client_id = '7647471'
    var url = URL + 'connect_vk_account'

    var redirect_uri = "https://oauth.vk.com/authorize?client_id=" + client_id + "&display=page&redirect_uri=" + url + "&scope=wall,groups,notify,ads,offline&response_type=token&v=5.122"

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

    const params = withToken()
    const body = JSON.stringify({ vk_id: user_id, token: access_token })

    axios.post(SERVER_URL + 'api/auth/connectVkProfile', body, params).then(res => {
        console.log(res)
        dispatch({
            type: UPDATE_VK_PROFILE,
            payload: res.data
        })
        window.location.replace(URL + 'workspace_menu')
    }).catch((err) => {
        console.log(err)
        // window.location.replace(URL);
    })
}

export const login = (username: string, password: string) => (dispatch: Dispatch<AuthDispatchTypes>) => {
    axios.post(SERVER_URL + 'api/auth/login', { username, password }).then(res => {
        if (res.data.response === 'Success') {
            dispatch({
                type: LOGIN,
                payload: res.data
            })
            window.location.replace(URL + 'workspace_menu')
        }
    })
}

export const register = (username: string, password: string, password2: string, email: string) => (dispatch: Dispatch<AuthDispatchTypes>) => {
    axios.post(SERVER_URL + 'api/auth/register', { username: username, email: email, password: password, password2: password2 }).then(res => {
        if (res.data.response === 'Success') {
            dispatch({
                type: LOGIN,
                payload: res.data
            })
            window.location.replace(URL + 'workspace')
        }
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

export const withToken = (params = {}): {} => {
    const state = store.getState()
    const user: TUser = state['auth']['user']
    if (user.token.length === 0) return { headers: { Token: '' }, params: params }
    return { headers: { Authorization: 'Token ' + user.token }, params: params }
}