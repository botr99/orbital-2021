const url =
  process.env.NODE_ENV === "production"
    ? "https://nus-ccsgp.herokuapp.com"
    : "http://localhost:5000";

export default url;
