/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 *
 */
// -----------------------------------------------------------------
/**
 *     SIGN IN / Login page
 */
//--------------------------------------------------------------------
import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import GoogleIcon from "@mui/icons-material/Google";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AMAlert from "../../../layouts/feedbacks/AMAlert";
import AMBackdrop from "../../../layouts/feedbacks/AMBackdrop";
import Copyright from "../general/Copyright";

import config from "../../../../constants/config";
import { login } from "../../../../api/user.api";
import { setCookie } from "../../../../utils/Cookies";
import { setLocalStorage } from "../../../../utils/Storage";

const Login = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  const [error, setError] = React.useState("");
  const [errorColor, setErrorColor] = React.useState("error");
  const [open, setOpen] = React.useState(false);
  const [required, setRequired] = React.useState({
    email: false,
    password: false,
  });
  const handleClose = () => {
    setOpen(false);
  };

  /**
   *
   * LOCAL LOGIN
   */
  const handleLocalLogin = async (e) => {
    setError("");
    setAlertOpen(true);
    setOpen(true);
    setRequired({
      ...required,
      email: false,
    });
    setRequired({
      ...required,
      password: false,
    });
    e.preventDefault();
    if (!(values.email && values.password)) {
      let isEmail, isPassword;
      if (!values.email) {
        isEmail = true;
      }
      if (!values.password) {
        isPassword = true;
      }
      setRequired({
        ...required,
        email: isEmail,
        password: isPassword,
      });
      setOpen(false);
      return;
    }

    await login
      .local(values.email, values.password)
      .then((res) => {
        const { data } = res;
        if (data.status) {
          setError("Success, redirecting ...");
          setErrorColor("success");
          window.localStorage.removeItem("access");
          window.localStorage.removeItem("user");
          setLocalStorage("access", data.access);
          let profileData = data.data ? data.data[0] : [];
          setLocalStorage("user", profileData);
          setCookie("refresh", data.refresh, 7);
          setTimeout(() => {
            setOpen(false);
            let from = location.state?.from?.pathname || "/user";
            navigate(from, { replace: true });
          }, 500);
        } else {
          setTimeout(() => {
            setOpen(false);
            navigate("/auth/notification/1"); // notify to verify email address if not verified
          }, 500);
        }
      })
      .catch((err) => {
        setOpen(false);

        if (err.message === "Request failed with status code 404") {
          setError("User is not exist!");
          setErrorColor("error");
        } else {
          setError("Error, Please try later!");
          setErrorColor("error");
        }
      });
  };
  /**
   *
   * GOOGLE LOGIN
   */
  const handleGoogleLogin = async (response) => {
    setOpen(true);
    let email = response.profileObj && response.profileObj.email;
    let firstName = response.profileObj && response.profileObj.givenName;
    let lastName = response.profileObj && response.profileObj.familyName;
    let imageUrl = response.profileObj && response.profileObj.imageUrl;

    await login
      .google(email, firstName, lastName, imageUrl)
      .then((res) => {
        const { data } = res;
        if (data.status) {
          setError("Success, redirecting ...");
          setErrorColor("success");
          window.localStorage.removeItem("access");
          window.localStorage.removeItem("user");
          setLocalStorage("access", data.access);
          let profileData = data.data ? data.data[0] : [];
          setLocalStorage("user", profileData);
          setCookie("refresh", data.refresh, 7);
          setTimeout(() => {
            setOpen(false);
            let from = location.state?.from?.pathname || "/user";
            navigate(from, { replace: true });
          }, 500);
        }
      })
      .catch((err) => {
        setOpen(false);
      });
    setError("You're offline.");
    setErrorColor("error");
  };

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setRequired({
      ...required,
      [prop]: false,
    });
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [alertOpen, setAlertOpen] = React.useState(true);
  return (
    <>
      <AMBackdrop open={open} />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 1,
            bgcolor: "#fafafa",
            border: 1,
            borderColor: `#e0e0e0`,
            mt: 6,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#83d39d", mt: 4 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign Up
          </Typography>

          <Box
            component="form"
            onSubmit={handleLocalLogin}
            noValidate
            sx={{ mt: -3, p: 4 }}
          >
            <Grid
              container
              justifyContent="center"
              alignItem="center"
              columnGap={1}
              spacing={0}
            >
              <Grid item xs="10">
                {error ? (
                  <>
                    <AMAlert alertTextColor={errorColor} alertText={error} />
                  </>
                ) : (
                  <></>
                )}

                <GoogleLogin
                  clientId={config.GOOGLE_CLIENT_ID}
                  render={(renderProps) => (
                    <Button
                      variant="contained"
                      color={`error`}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      sx={{ height: 40, width: `100%` }}
                    >
                      <GoogleIcon sx={{ fontSize: 25 }} /> &nbsp; &nbsp;
                      <b>Continue with Google</b>
                    </Button>
                  )}
                  buttonText="Login"
                  onSuccess={handleGoogleLogin}
                  onFailure={handleGoogleLogin}
                  cookiePolicy={"single_host_origin"}
                />

                <FormControl
                  sx={{ width: "100%", mt: 2 }}
                  variant="outlined"
                  color={required.email ? "error" : "primary"}
                  focused={required.email ? true : false}
                >
                  <TextField
                    type={`email`}
                    value={values.email}
                    onChange={handleChange("email")}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    value={values.password}
                    onChange={handleChange("password")}
                    type={values.showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="current-password"
                  />

                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color={`primary`}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/auth/forgot-password" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/auth/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 8, mb: 4, textAlign: "center" }} />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Login;
