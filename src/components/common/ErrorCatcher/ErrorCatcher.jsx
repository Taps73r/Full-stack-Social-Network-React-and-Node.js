import React from "react";
import ReactDOM from "react-dom";
import "./ErrorCatcher.css";

const ErrorCatcherPortal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="ErrorCatcherPortal">{children}</div>,
    document.body
  );
};

const ErrorCatcher = ({ errorMessage }) => {
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

export default ErrorCatcher;
