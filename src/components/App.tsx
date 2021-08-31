import * as React from 'react';
import { useState, } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import Alert from './alerts/Alert';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './main/Home';
import Workspace from './workspace/Workspace';
import ConnectVkAccount from './auth/ConnectVkAccount';
import WorkspaceCabinetSelector from './workspace/WorkspaceCabinetSelector';
import AccountCredentials from './auth/AccountCredentials';
import SuccessPaymentPage from './workspace/Additions/SuccessPaymentPage';
import FailPaymentPage from './workspace/Additions/FailPaymentPage';


const App: React.FC = () => {
    return (
        <>
            <Alert />

            <Router>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/workspace" component={Workspace} />
                    <Route exact path="/workspace_menu" component={WorkspaceCabinetSelector} />

                    <Route exact path="/connect_vk_account" component={ConnectVkAccount} />

                    <Route exact path="/credentials" component={AccountCredentials} />

                    <Route exact path="/successPayment" component={SuccessPaymentPage} />
                    <Route exact path="/failPayment" component={FailPaymentPage} />



                </Switch>
            </Router>
        </>
    )
}

export default App