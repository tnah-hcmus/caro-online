import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../common/Copyright';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpPanel = (props) => {
  const classes = useStyles();
  const [googleUrl, setGoogleUrl] = useState('#');
  const [error, setError] = useState(null);
  useEffect(() => {
    props.getGoogleUrl().then((url) => setGoogleUrl(url))
  }, []);
  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    const name = e.target.elements.fname.value.trim() + ' ' + e.target.elements.lname.value.trim();
    const password = e.target.elements.password.value.trim();
    const email = e.target.elements.email.value.trim();
    props.signup({email, password, name}, setError);
  }  
  return (
      <>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit = {handleSubmitSignUp} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Button
          href = {googleUrl}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Log In With google
        </Button>
        <Button
          href = {props.facebookUrl}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Log In With Facebook
        </Button>
          {!!error && 
          <Typography variant="body2" color = "error">
          {error}
          </Typography>}
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick = {() => props.toLogin()} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </>
  );
}
export default SignUpPanel;