import {combineReducers, legacy_createStore as createStore} from "redux";
import { profileReducer } from "./profile-reducer";
import { dialogReducer } from "./dialog-reducer";
import { usersReducer } from "./users-reducer";
import { authReducer } from "./auth-reducer";

let reducers = combineReducers({
    profileInfo: profileReducer,
    messageInfo: dialogReducer,
    usersInfo: usersReducer,
    authInfo: authReducer
})

let store = createStore(reducers);

export default store;