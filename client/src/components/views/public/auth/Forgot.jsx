import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { verifyAccount } from "../../../../api/user.api";
import AMBackdrop from "../../../layouts/feedbacks/AMBackdrop";

const Forgot = (props) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleConfirmEmail = async (e) => {
    e.preventDefault();
    if (!values.email) {
      setError("");
      return;
    }
    await verifyAccount
      .resetPassword(values.email)
      .then((res) => {
        const { data } = res;
        if (data.status) {
          setError("");
          setTimeout(() => {
            window.location.href = "/auth/notification/0";
          }, 200);
        }
      })
      .catch((err) => {
        setError("Email not found!");
      });
  };

  const [values, setValues] = React.useState({
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
          <Avatar sx={{ m: 1, bgcolor: "#e65100", mt: 4 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Forgot Password?
          </Typography>
          <Box
            component="form"
            onSubmit={handleConfirmEmail}
            noValidate
            sx={{ mt: -3, p: 4, width: `100%` }}
          >
            <Grid
              container
              justifyContent="center"
              alignItem="center"
              columnGap={1}
              spacing={0}
              sx={{ width: `100` }}
            >
              <Grid item xs="10">
                <FormControl sx={{ width: "100%", mt: 1 }} variant="outlined">
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
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color={`secondary`}
                  sx={{ mt: 0, mb: 1, mt: 2 }}
                >
                  Verify Email
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Forgot;
