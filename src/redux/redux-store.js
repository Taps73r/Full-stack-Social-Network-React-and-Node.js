import { combineReducers, legacy_createStore as createStore } from "redux";
import { profileReducer } from "./profile-reducer";
import { dialogReducer } from "./dialog-reducer";
import { usersReducer } from "./users-reducer";
import loginReducer from "./login-reducer";
import registrationReducer from "./register-reducer";
import { otherProfileReducer } from "./other-profile-reducer";
import { errorReducer } from "./error-reducer";
let reducers = combineReducers({
    profileInfo: profileReducer,
    messageInfo: dialogReducer,
    usersInfo: usersReducer,
    loginInfo: loginReducer,
    registerInfo: registrationReducer,
    otherProfileInfo: otherProfileReducer,
    errorInfo: errorReducer

})

let store = createStore(reducers);

export default store;