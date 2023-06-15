
const initialState = {
    authenticated: false
  };
  
  const ActionTypes = {
    SET_DATA: "SET_DATA",
    SET_AUTH_STATUS: "SET_AUTH_STATUS",
    SET_ERROR: "SET_ERROR",
    SET_LOADING: "SET_LOADING",
    RESET_STATE: "RESET_STATE",
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case ActionTypes.SET_DATA:
        return {
          ...state,
          authenticated: action.payload.authenticated
        };
  
      case ActionTypes.SET_AUTH_STATUS:
        return {
          ...state,
          authenticated: action.payload,
        };
  
      case ActionTypes.SET_ERROR:
        return { ...state, error: action.payload };
  
      case ActionTypes.SET_LOADING:
        return { ...state, loading: action.payload };
  
      case ActionTypes.RESET_STATE:
        return initialState;
  
      default:
        return state;
    }
  };
  
  const Actions = {
    setAuthStatus: (status, dispatch) => {
      dispatch({
        type: ActionTypes.SET_AUTH_STATUS,
        payload: status,
      });
    },
  
    setError: (err, dispatch) => {
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: err,
      });
    },
  
    setLoading: (loading, dispatch) => {
      dispatch({
        type: ActionTypes.SET_LOADING,
        payload: loading,
      });
    },
  
    resetState: (dispatch) => {
      dispatch({
        type: ActionTypes.RESET_STATE,
      });
    },
  };
  
  const Auth = { ActionTypes, Actions, reducer, initialState };
  
  export default Auth;
  