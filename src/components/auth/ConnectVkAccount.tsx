import * as React from 'react';
import { useDispatch } from 'react-redux';
import { extractToken } from '../../actions/auth/login';

interface IConnectVkAccountProps {
}

const ConnectVkAccount: React.FunctionComponent<IConnectVkAccountProps> = (props) => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        var href: string = window.location.href
        href = href.split('/').pop()
        console.log(href)
        if (href.length > 30)
            dispatch(extractToken())
    }, [])
    return <></>;
};

export default ConnectVkAccount;
