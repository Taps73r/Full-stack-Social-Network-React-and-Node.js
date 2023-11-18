import { connect } from "react-redux";
import { resetData } from "../../redux/login-reducer";
import Settings from "./Settings";


let SettingsContainer = connect(null, {
    resetData
})(Settings);

export default SettingsContainer;