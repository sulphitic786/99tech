import React, { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
  } from '../../firebase';
  import { useDispatch } from 'react-redux';
  import { login } from '../../features/userSlice';
  import './Login.css'; 

// export default function SignIn() {
  function Login() {
  const [loginType, setLoginType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const dispatch = useDispatch();

  const loginToApp = (e) => {
    if(email=="" || password==""){
      alert("Please fill the mandatory fields first!")
    }
    else{
      e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        // console.log("userAuth", userAuth)
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        );
      })
      .catch((err) => {
        alert("Error: Email or Password Wrong.");
      });
    }
  };

  const register = () => {
    if (name=="" || email=="" || password=="") {
      return alert('Error: Please fill all the details firest!');
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: name,
          photoURL: profilePic,
        })
          .then(
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePic,
              })
            )
          )
          .catch((error) => {
            console.log('user not updated', error);
          });
      })
      .catch((err) => {
        alert("Something Went Wrong!:");
      });
    }
  };


  return (<>
    {loginType=="login"?
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={loginToApp}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item >
              {"Don't have an account?"}
              <Link onClick={()=>{setLoginType("register")}} sx={{ px: 1 }} href="#" variant="body2">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    :
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="imageProfile"
            label="Profile Image"
            name="imageProfile"
            autoComplete="imageProfile"
            autoFocus
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={register}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item >
              {"Don't have an account?"}
              <Link onClick={()=>{setLoginType("login")}} sx={{ px: 1 }} href="#" variant="body2">
                {"Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    }
    </>
  );
}
export default Login;