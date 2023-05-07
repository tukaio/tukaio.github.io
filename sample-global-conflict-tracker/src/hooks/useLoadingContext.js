import React from "react";

const notFetch = (time) =>
  new Promise((yes, no) => {
    setTimeout(() => (Math.ceil(Math.random() * 100) < 10 ? no() : yes()), time);
  });

const useNotFetch = (toggleLoading) => (payload) => {
  toggleLoading(true);
  return notFetch(4000).finally(() => toggleLoading(false));
};

const contexts = {};

// const LoadingContext = React.createContext();

function LoadingContext(label) {
  if (!contexts[label]) {
    contexts[label] = React.createContext();
  }
  const LoadingContext = contexts[label];

  function LoadingProvider({ children }) {
    const [isLoading, toggleLoading] = React.useState(false);
    return (
      <LoadingContext.Provider value={{ loadingFetch: useNotFetch(toggleLoading), isLoading }}>
        {children}
      </LoadingContext.Provider>
    );
  }

  const LoadingOverlay = ({ children }) => {
    const context = React.useContext(LoadingContext);
    const overlay = React.useRef(null);
    const [margin, setMargin] = React.useState({});
    React.useEffect(() => {
      setMargin(overlay.current && window.getComputedStyle(overlay.current));
      if (overlay.current) {
        const { marginTop, marginBottom, marginLeft, marginRight } = window.getComputedStyle(
          overlay.current.querySelector(":first-child")
        );
        setMargin({ marginTop, marginBottom, marginLeft, marginRight });
      }
    }, [overlay]);
    return (
      <span className="overlay" ref={overlay}>
        {children}
        {context.isLoading && (
          <span className="cover" style={margin}>
            <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
              <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" />
            </svg>
          </span>
        )}
      </span>
    );
  };

  function useLoadingFetch() {
    const context = React.useContext(LoadingContext);

    if (context === undefined) {
      throw new Error("useLoadingFetch must be used within a LoadingProvider");
    }
    return context.loadingFetch;
  }

  return { useLoadingFetch, LoadingOverlay, LoadingProvider };
}

export default LoadingContext;
