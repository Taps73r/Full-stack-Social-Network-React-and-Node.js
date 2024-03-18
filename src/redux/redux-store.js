import { combineReducers, legacy_createStore as createStore } from "redux";
import { profileReducer } from "./profile-reducer";
import { dialogReducer } from "./dialog-reducer";
import { usersReducer } from "./users-reducer";
import loginReducer from "./login-reducer";
import registrationReducer from "./register-reducer";
import { otherProfileReducer } from "./other-profile-reducer";
import { errorReducer } from "./error-reducer";
import { newsReducer } from "./news-reducer";
let reducers = combineReducers({
  profileInfo: profileReducer,
  messageInfo: dialogReducer,
  usersInfo: usersReducer,
  loginInfo: loginReducer,
  registerInfo: registrationReducer,
  otherProfileInfo: otherProfileReducer,
  errorInfo: errorReducer,
  newsInfo: newsReducer,
});

let store = createStore(
  reducers,
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);

export default store;
