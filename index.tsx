import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './src/components/App'

//css

import './src/css/all.css'
import './src/css/fixer.css'
import './src/css/home.css'
import './src/css/login.css'
import './src/css/ws-header.css'
import './src/css/cabinets.css'
import './src/css/additions.css'
import './src/css/reports.css'

import { persistStore } from 'redux-persist'
import store from './src/store'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store);


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.querySelector('#root')
)

