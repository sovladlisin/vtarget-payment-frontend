import { combineReducers } from "redux";
import { alertsReducer } from "./alerts/alerts";
import authReducer from "./auth/login";
import { cabinetReducer } from "./cabinets/cabinets";
import { paymentReducer } from "./payments/payments";


const RootReducer = combineReducers({

    alerts: alertsReducer,
    auth: authReducer,
    cabinets: cabinetReducer,
    payments: paymentReducer
});

export default RootReducer