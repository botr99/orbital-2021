import { useState } from "react";
import { Box, Button, Container, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Input from "../Auth/Input";
import validator from "validator";
// import ROLES from "../../utils/roles";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { updatePassword } from "../../apis/AuthApi";
import LoadingSpinner from "../LoadingSpinner";

const UpdatePassword = () => {
  const { id } = useParams();
  // const user = JSON.parse(localStorage.getItem("profile")); // get logged in user
  // const role = user?.result?.role;

  const initialFormData = {
    // website: "",
    // contactNum: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const { error, mutate, isError, isLoading, isSuccess } =
    useMutation(updatePassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      userId: id,
      userFields: formData,
    });
  };

  // const validateWebsite = () => {
  //   return validator.isURL(formData.website);
  // };

  // const validateContact = () => {
  //   return validator.isMobilePhone(formData.contactNum, "en-SG");
  // };

  const isNewPasswordEmpty = () => formData.newPassword === "";

  const handleShowPassword = () => setShowPassword(!showPassword);

  const validatePassword = () => {
    return validator.isStrongPassword(formData.newPassword);
  };

  const validateRepeatPassword = () => {
    return validator.equals(formData.newPassword, formData.confirmNewPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validatePassword();
  };

  return (
    <Container maxWidth="md">
      <Box marginBottom={2}>
        {isError && (
          <Alert variant="filled" severity="error">
            {error.response.data?.message}
          </Alert>
        )}
        {isSuccess && (
          <Alert variant="filled" severity="success">
            Password is successfully updated
          </Alert>
        )}
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* {(role === ROLES.StudentGroup || role === ROLES.Organization) && (
          <>
            <Input
              helperText={
                !validateWebsite() ? "Please enter a valid website." : ""
              }
              handleError={!validateWebsite()}
              name="website"
              label="Group/Organization Website"
              handleChange={handleChange}
              fullWidth
            />
          </>
        )} */}
          {/* <Input
          helperText={
            !validateContact() ? "Please enter a valid phone number" : ""
          }
          handleError={!validateContact()}
          name="contactNum"
          label="Contact Number"
          handleChange={handleChange}
          fullWidth
          type="tel"
        /> */}
          <Input
            helperText={
              !validatePassword()
                ? "Please use a stronger password with a minimum length of 8 characters with at least 1 lowercase, uppercase, number and symbol"
                : ""
            }
            handleError={!isNewPasswordEmpty() && !validatePassword()}
            name="newPassword"
            label="New Password"
            handleChange={handleChange}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          <Input
            helperText={
              !validateRepeatPassword() ? "Passwords do not match" : ""
            }
            handleError={!validateRepeatPassword()}
            name="confirmNewPassword"
            label="Repeat New Password"
            handleChange={handleChange}
            type="password"
          />
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!(validatePassword() && validateRepeatPassword())}>
              {isLoading ? <LoadingSpinner /> : "Update password"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdatePassword;
