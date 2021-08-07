import { combineReducers } from "redux";
import { alertsReducer } from "./alerts/alerts";
import authReducer from "./auth/login";
import { cabinetReducer } from "./cabinets/cabinets";


const RootReducer = combineReducers({

    alerts: alertsReducer,
    auth: authReducer,
    cabinets: cabinetReducer,

});

export default RootReducer