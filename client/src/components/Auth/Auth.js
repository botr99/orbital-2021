import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import validator from "validator";

import { login, signup } from "../../actions/auth.js";
import useStyles from "./styles";
import Input from "./Input";
import TnC from "./TnC";
import ROLES from "../../utils/roles.js";

const Auth = () => {
  const initialFormData = {
    role: "",
    firstName: "",
    lastName: "",
    name: "",
    website: "",
    regNum: "",
    contactNum: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [agree, setAgree] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  // const [isInvalidForm, setIsInvalidForm] = useState(true); // Disable form submission if invalid form data

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(login(formData, history));
    }
  };

  const requireNUSEmail = () => {
    return isSignup && formData.role === ROLES.Student;
  };

  const validateNUSEmail = () => {
    return formData.email.split("@")[1] === "u.nus.edu";
  };

  const validateContact = () => {
    return validator.isMobilePhone(formData.contactNum, "en-SG");
  };

  const validatePassword = () => {
    return validator.isStrongPassword(formData.password);
  };

  const validateRepeatPassword = () => {
    return validator.equals(formData.password, formData.confirmPassword);
  };

  const validateWebsite = () => {
    return validator.isURL(formData.website);
  };

  // const validateSignup = () => {
  //   console.log(agree);
  //   console.log(validateContact());
  //   if (
  //     agree &&
  //     validateContact() &&
  //     validatePassword() &&
  //     validator.isEmail(formData.email)
  //   ) {
  //     setIsInvalidForm(false);
  //   } else {
  //     setIsInvalidForm(true);
  //   }
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheck = () => {
    setAgree(!agree);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Login"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}>
                <InputLabel id="role">Role</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  autoFocus
                  label="role">
                  <MenuItem value={ROLES.Student}>Student</MenuItem>
                  <MenuItem value={ROLES.StudentGroup}>Student Group</MenuItem>
                  <MenuItem value={ROLES.Organization}>Organization</MenuItem>
                </Select>
              </FormControl>
            )}
            {isSignup && formData.role === ROLES.Student && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            {isSignup &&
              (formData.role === ROLES.StudentGroup ||
                formData.role === ROLES.Organization) && (
                <>
                  <Input
                    name="name"
                    label="Group/Organization Name"
                    handleChange={handleChange}
                    fullWidth
                  />
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
                  {formData.role === ROLES.Organization && (
                    <Input
                      name="regNum"
                      label="UEN/Charity or Society Registration Number"
                      handleChange={handleChange}
                      fullWidth
                    />
                  )}
                </>
              )}
            {isSignup && (
              <Input
                helperText={
                  !validateContact() ? "Please enter a valid phone number" : ""
                }
                handleError={!validateContact()}
                name="contactNum"
                label="Contact Number"
                handleChange={handleChange}
                fullWidth
                type="tel"
              />
            )}
            <Input
              helperText={
                !validator.isEmail(formData.email)
                  ? "Please enter a valid email address"
                  : requireNUSEmail()
                  ? validateNUSEmail()
                    ? ""
                    : "Please sign up using your NUS email address ending in 'u.nus.edu'"
                  : ""
              }
              handleError={
                !validator.isEmail(formData.email) ||
                (requireNUSEmail() && !validateNUSEmail())
              }
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              helperText={
                isSignup && !validatePassword()
                  ? "Please use a stronger password with a minimum length of 8 characters with at least 1 lowercase, uppercase, number and symbol"
                  : ""
              }
              handleError={isSignup && !validatePassword()}
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                helperText={
                  !validateRepeatPassword() ? "Passwords do not match" : ""
                }
                handleError={!validateRepeatPassword()}
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          {isSignup && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={agree}
                    onChange={handleCheck}
                    name="TnC"
                  />
                }
                label="I agree to the"
              />
              <TnC setAgree={setAgree} />
            </>
          )}
          <Button
            disabled={isSignup && !agree}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            {isSignup ? "Sign Up" : "Login"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
