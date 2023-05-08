import React from "react";
import { ReactComponent as Spinner } from "../assets/loading.svg";

const LoadingOverlay = ({ children, showSpinner }) => {
  const overlay = React.useRef(null);
  return (
    <span className="overlay" ref={overlay}>
      {children}
      {showSpinner && (
        <span className="cover">
          <span className="spinner">
            <Spinner />
          </span>
        </span>
      )}
    </span>
  );
};

export default LoadingOverlay;
