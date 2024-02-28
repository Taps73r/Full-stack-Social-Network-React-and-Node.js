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

const ErrorCatcher = ({ errorMessage, setErrorMessage, statusCode }) => {
  const handleConfirm = () => {
    setErrorMessage("");

    if (statusCode === 401) {
      window.location.replace("/login");
      localStorage.removeItem("token");
    }
  };

  return (
    <ErrorCatcherPortal>
      <div className="ErrorCatcher">
        <div className="ErrorBlock">
          <p>{errorMessage}</p>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </ErrorCatcherPortal>
  );
};

const mapStateToProps = (state) => ({
  errorMessage: state.errorInfo.errorMessage,
  statusCode: state.errorInfo.statusCode,
});

const ErrorCatcherContainer = connect(mapStateToProps, {
  setErrorMessage,
})(ErrorCatcher);

export default ErrorCatcherContainer;
