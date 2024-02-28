import React from "react";
import ReactDOM from "react-dom";
import "./ErrorCatcher.css";
import { connect } from "react-redux";
import { setErrorMessage } from "../../../redux/error-reducer";

const ErrorCatcherPortal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="ErrorCatcherPortal">{children}</div>,
    document.body
  );
};

const ErrorCatcher = () => {
  return (
    <ErrorCatcherPortal>
      <div className="ErrorCatcher">
        <div className="ErrorBlock">
          <p>{}</p>
          <button>Confirm</button>
        </div>
      </div>
    </ErrorCatcherPortal>
  );
};

const mapStateToProps = (state) => ({
  errorMessage: state.errorInfo.errorMessage,
});

const ErrorCatcherContainer = connect(mapStateToProps, {
  setErrorMessage,
})(ErrorCatcher);

export default ErrorCatcherContainer;
