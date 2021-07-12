const authReducer = (
  state = { authData: null, isLoggingIn: false },
  action
) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoggingIn: true };
    case "END_LOADING":
      return { ...state, isLoggingIn: false };
    case "AUTH": // Successful login/signup
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data };
    case "LOGOUT":
      localStorage.clear();

      return { ...state, authData: null };
    case "AUTH_ERROR":
      return { ...state, message: action.message, severity: "error" };
    default:
      return state;
  }
};

export default authReducer;
