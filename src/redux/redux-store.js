import {combineReducers, legacy_createStore as createStore} from "redux";
import { profileReducer } from "./profile-reducer";
import { dialogReducer } from "./dialog-reducer";

let reducers = combineReducers({
    profileInfo: profileReducer,
    messageInfo: dialogReducer
})

let store = createStore(reducers);

export default store;