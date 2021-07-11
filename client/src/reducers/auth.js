const authReducer = (
  state = { authData: null, isUserLoading: false },
  action
) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isUserLoading: true };
    case "END_LOADING":
      return { ...state, isUserLoading: false };
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, errors: null };
    case "LOGOUT":
      localStorage.clear();

      return { ...state, authData: null, errors: null };

    case "AUTH_ERROR":
      return { ...state, authData: null, errors: action.error };
    default:
      return state;
  }
};

export default authReducer;
