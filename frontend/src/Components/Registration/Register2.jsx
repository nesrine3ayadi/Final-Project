import React, {useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../Login/Login.scss'
import logo from '../../img/logo.png'

import "./Register.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 function Register2(props) {
  const classes = useStyles();
   const [exist, setExist] = useState("")
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        imageUser: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bca91b5a-7127-45f9-8892-c6fde43ffb8c/d8zy2yu-cd50751d-9351-490b-8290-daf808f6af2b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYmNhOTFiNWEtNzEyNy00NWY5LTg4OTItYzZmZGU0M2ZmYjhjXC9kOHp5Mnl1LWNkNTA3NTFkLTkzNTEtNDkwYi04MjkwLWRhZjgwOGY2YWYyYi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.lgsfD-ZImPrjQIHKlk1bWVsuAYM4Qx3dn5JWzEvbnsI",
        imageCover: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gamer-red-youtube-channel-art-banner-design-template-c960102d5418d78435ad333f1638c9d6_screen.jpg?ts=1561461377",
        dataOfBirth: "",
        aboutUser: "",
        country: "",
        activate: true,
        banned: false,
        createdAt: Date.now(),
        role: "user"

    });
    const add = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/", user).then(response => {
            console.log("the status is:", response.status);
            if (response.status === 200) {
                props.history.push("/login");
               
            };
        }).catch(err => {
            setExist("user already exist , try another email  !")
            setUser({
                ...user,
                password: "",
                email: "",
                confirmPassword: ""
            })
        });;


    };

  return (
      <div id="register" >
    <Container component="main" maxWidth="xs"  >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <img src={logo} width="100px" />
        </Avatar>
        <Typography component="h1" variant="h5">
       
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="username"
                autoFocus
                value={
                    user.username
                }
                onChange={
                    (e) => setUser({
                        ...user,
                        username: e.target.value
                    })
                }
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
                value={
                    user.email
                }
                onChange={
                    (e) => setUser({
                        ...user,
                        email: e.target.value
                    })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={
                    user.password
                }
                onChange={
                    (e) => setUser({
                        ...user,
                        password: e.target.value
                    })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={
                    user.confirmPassword
                }
                onChange={
                    (e) => setUser({
                        ...user,
                        confirmPassword: e.target.value
                    })
                }
              />
            </Grid>
        
          </Grid>
          <Button
            onClick={add}
            fullWidth
            variant="contained"
            color="primary"
           
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
       
      </Box>
    </Container>
    </div>
  );
}
export default withRouter(Register2);