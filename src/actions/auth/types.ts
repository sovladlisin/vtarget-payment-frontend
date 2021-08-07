import { ICreateAlert } from "../alerts/types"

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const SHUTTERSTOCK_TOKEN_CHECK = 'SHUTTERSTOCK_TOKEN_CHECK'
export const CONNECT_SHUTTERSTOCK_TOKEN = 'CONNECT_SHUTTERSTOCK_TOKEN'
export const DISCONNECT_SHUTTERSTOCK_TOKEN = 'DISCONNECT_SHUTTERSTOCK_TOKEN'

export const GET_SERVICE_REQUESTS = 'GET_SERVICE_REQUESTS'
export const APPLY_SERVICE_REQUEST = 'APPLY_SERVICE_REQUEST'
export const ACCEPT_SERVICE_REQUEST = 'ACCEPT_SERVICE_REQUEST'
export const DENY_SERVICE_REQUEST = 'DENY_SERVICE_REQUEST'

export const GET_SERVICE_INFO = 'GET_SERVICE_INFO'
export const EDIT_SERVICE_INFO = 'EDIT_SERVICE_INFO'

export const GET_PHOTOSTOCK_ACCOUNTS = 'GET_PHOTOSTOCK_ACCOUNTS'
export const EDIT_PHOTOSTOCK_ACCOUNT = 'EDIT_PHOTOSTOCK_ACCOUNT'
export const DELETE_PHOTOSTOCK_ACCOUNT = 'DELETE_PHOTOSTOCK_ACCOUNT'
export const CREATE_PHOTOSTOCK_ACCOUNT = 'CREATE_PHOTOSTOCK_ACCOUNT'
export const ACTIVATE_PHOTOSTOCK_ACCOUNT = 'ACTIVATE_PHOTOSTOCK_ACCOUNT'

export const GET_PHOTO_DOWNLOAD_RECORDS = 'GET_PHOTO_DOWNLOAD_RECORDS'
export const PHOTO_BAN_USER = 'PHOTO_BAN_USER'

export const GET_ALL_USERS = 'GET_ALL_USERS'
export const GET_USER_MEDALS = 'GET_USER_MEDALS'

export const TOGGLE_USER_ADMIN_ROLE = 'TOGGLE_USER_ADMIN_ROLE'

export type TUser = {
    id: number,
    user_id: number | string,
    user_img: string,
    user_name: string,
    token: boolean,
    is_admin: boolean
}

export type TServiceRequest = {
    id?: number,
    user: number,
    service_id: number,
    is_accepted: boolean,
    is_pending: boolean,
    is_denied: boolean,
    date_until: Date
}

export type TServiceInfo = {
    id?: number,
    service_id: number,
    text: string
}

export type TPhotostockAccount = {
    id?: number,
    username: string,
    password: boolean | string,
    stock_type: number,
    active: boolean,
    available_downloads: number,
    rest_of_days: number,


}


export type TPhotoDownloadRecord = {
    id?: number,
    dates: number[],
    user: TUser
}

interface IToggleUserAdminRole {
    type: typeof TOGGLE_USER_ADMIN_ROLE
    payload: number
}

interface ILogin {
    type: typeof LOGIN
    payload: TUser
}

interface ILogout {
    type: typeof LOGOUT
}

interface IGetPhotoDownloadRecords {
    type: typeof GET_PHOTO_DOWNLOAD_RECORDS,
    payload: TPhotoDownloadRecord[]
}
interface IPhotoBanUser {
    type: typeof PHOTO_BAN_USER,
    payload: number
}
interface ICheckShutterstockLogin {
    type: typeof SHUTTERSTOCK_TOKEN_CHECK
    payload: boolean
}

interface IConnectShutterstockLogin {
    type: typeof CONNECT_SHUTTERSTOCK_TOKEN
    payload: boolean
}

interface IDisconnectShutterstockToken {
    type: typeof DISCONNECT_SHUTTERSTOCK_TOKEN
}


interface IGetServiceRequests {
    type: typeof GET_SERVICE_REQUESTS
    payload: TServiceRequest[]
}
interface IApplyServiceRequest {
    type: typeof APPLY_SERVICE_REQUEST
    payload: TServiceRequest
}
interface IAcceptServiceRequest {
    type: typeof ACCEPT_SERVICE_REQUEST
    payload: TServiceRequest
}
interface IDenyServiceRequest {
    type: typeof DENY_SERVICE_REQUEST
    payload: TServiceRequest
}

//service_info
interface IGetServiceInfo {
    type: typeof GET_SERVICE_INFO
    payload: TServiceInfo[]
}
interface IEditServiceInfo {
    type: typeof EDIT_SERVICE_INFO
    payload: TServiceInfo
}
//PhotostockAccounts
interface IGetPhotostockAccounts {
    type: typeof GET_PHOTOSTOCK_ACCOUNTS
    payload: TPhotostockAccount[]
}
interface ICreatePhotostockAccount {
    type: typeof CREATE_PHOTOSTOCK_ACCOUNT
    payload: TPhotostockAccount
}
interface IEditPhotostockAccount {
    type: typeof EDIT_PHOTOSTOCK_ACCOUNT
    payload: TPhotostockAccount
}
interface IDeletePhotostockAccount {
    type: typeof DELETE_PHOTOSTOCK_ACCOUNT
    payload: number
}
interface IActivatePhotostockAccount {
    type: typeof ACTIVATE_PHOTOSTOCK_ACCOUNT
    payload: number
}

// ------------------
interface IGetAllUsers {
    type: typeof GET_ALL_USERS,
    payload: TUser[]
}

//----------------

interface IGetUserMedals {
    type: typeof GET_USER_MEDALS,
    payload: { tier: number, title: string }[]
}
export type AuthDispatchTypes = IActivatePhotostockAccount | IDeletePhotostockAccount | IEditPhotostockAccount | ICreatePhotostockAccount |
    IGetUserMedals | IGetAllUsers |
    IGetPhotostockAccounts | IEditServiceInfo | IGetServiceInfo | IGetServiceRequests | IApplyServiceRequest | IAcceptServiceRequest |
    IDenyServiceRequest |
    ICheckShutterstockLogin | ILogin | ILogout | ICreateAlert | IConnectShutterstockLogin | IDisconnectShutterstockToken | IGetPhotoDownloadRecords |
    IPhotoBanUser | IToggleUserAdminRole