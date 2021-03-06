import React, { useState } from "react";
import {Button, TextField, FormControlLabel, Checkbox, Link, Box, Grid, Typography} from  "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Facebook from "@material-ui/icons/Facebook";
import Copyright from "../common/Copyright";
import CustomizedSnackbars from "../common/CustomizedSnackbars";


const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1.2, 0),
    minHeight: 40,
  },
}));

const LoginPanel = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    props.login(email, password, setMessage);
  };
  return (
    <>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmitLogin}>
        <TextField
          variant="outlined"
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
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          Log In
        </Button>
        <Button
          href={"/auth/google"}
          startIcon={
            <img
              width="20px"
              style={{ marginBottom: 3, marginRight: 5 }}
              alt="Google sign-in"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
          }
          fullWidth
          variant="contained"
          color="default"
          className={classes.submit}
        >
          Log In With Google
        </Button>
        <Button
          href={"/auth/facebook"}
          startIcon={<Facebook color="primary" style={{ fontSize: 28 }} />}
          fullWidth
          variant="contained"
          color="default"
          className={classes.submit}
        >
          Log In With Facebook
        </Button>
        <CustomizedSnackbars message={message} />
        <Grid container>
          <Grid item xs>
            <Link href={"/password/forgot"} variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link onClick={() => props.toSignUp()} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </>
  );
};
export default LoginPanel;
