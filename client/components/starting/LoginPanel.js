import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../common/Copyright";
import Typography from "@material-ui/core/Typography";
import CustomizedSnackbars from "../common/CustomizedSnackbars";
import FacebookIcon from "@material-ui/icons/Facebook";

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
  const [googleUrl, setGoogleUrl] = useState("#");
  const [message, setMessage] = useState(null);
  useEffect(() => {
    props.getGoogleUrl().then((url) => setGoogleUrl(url));
  }, []);
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
          href={googleUrl}
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
          href={props.facebookUrl}
          startIcon={<FacebookIcon color="primary" style={{ fontSize: 28 }} />}
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
            <Link href="#" variant="body2">
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
