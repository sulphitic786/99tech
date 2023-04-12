import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { login, logout, selectUser } from './features/userSlice';
import { auth, onAuthStateChanged } from './firebase';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import TableData from './components/TableData';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      // console.log('page loaded', auth);
      if (userAuth) {
        // user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <>
    <div className='app'>
      <Header />
      {!user ? (
        <Login />
      ) : 
      (<>
      <Container maxWidth="lg">
        <Typography sx={{ mt: 1, textAlign: 'center', color:'green' }}> <b>Welcome: {user?.displayName}!</b> </Typography>
        <Typography sx={{ mt: 3, mb: 2, textAlign: 'center' }}> <b>Simple data called with API</b> </Typography>
        <TableData />
      </Container>
    </>
      )
      }
    </div>    
    </>
  );
}

export default App;
