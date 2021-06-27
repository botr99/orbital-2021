let url = "http://localhost:5000";

if (process.env.NODE_ENV === "production") {
  url = "https://nus-ccsgp.herokuapp.com";
}

export default url;
