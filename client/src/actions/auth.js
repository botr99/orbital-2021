import * as api from "../apis/AuthApi";

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);

    dispatch({ type: "START_LOADING" });
    dispatch({ type: "AUTH", data });
    dispatch({ type: "END_LOADING" });
    history.push("/");
  } catch (error) {
    window.alert(error.response.data.message);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: "START_LOADING" });
    dispatch({ type: "AUTH", data });
    dispatch({ type: "END_LOADING" });
    history.push("/");
  } catch (error) {
    window.alert(error.response.data.message);
  }
};
