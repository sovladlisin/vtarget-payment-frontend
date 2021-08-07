import * as React from 'react';
import { useState, } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import Alert from './alerts/Alert';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './main/Home';
import Workspace from './workspace/Workspace';


const App: React.FC = () => {
    return (
        <>
            <Alert />

            <Router>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/workspace" component={Workspace} />


                </Switch>
            </Router>
        </>
    )
}

export default App