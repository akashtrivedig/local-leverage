/**
 * author: akash trivedi
 * date-created: 10-march-2022
 * functionality: render the registration form for customer
 * caller function: ecommerce-frontend\src\publisher\routes\PublisherPrivateRoutes.js or ecommerce-frontend\src\publisher\routes\CustomerPrivateRoutes.js
 * performs-network-request: true
 */

import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Grid, Button, TextField, Box, FormControlLabel, Checkbox
} from '@mui/material';
import ApplicationContext from '../../main/context/ApplicationContext';

let baseUrl = null

export default function Signup(props) {
  baseUrl = useContext(ApplicationContext).appData.baseUrl
  let navigate = useNavigate();
  const stateObject = useContext(ApplicationContext)
  let [formData, updateForm] = React.useState({
    username: '',
    password1: '',
    password2: '',
    otp: null
  });

  function checkUsername(username) {
    if (username.length === 10) {
      return true
    }
    alert('please provide valid contact number')
    return false
  }

  function checkPassword(arg1, arg2) {
    if (arg1.localeCompare(arg2) === 0) {
      return true
    }
    alert('passwords do not match!');
    return false
  }

  function addUserToDatabase() {
    console.log('signup called');
    const finalData = {
      username: formData.username,
      password: formData.password1
    }
    async function sendUserData(data) {
      console.log('waiting for fetch to complete');
      try {
        let response = await fetch(props.variables.link, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        console.log('fetch completed');
        response = await response.json();
        return response;
      } catch (error) {
        console.log(error);
      }
    }

    let a = sendUserData(finalData);
    return a
  }

  function verifyOtp(event) {
    if (document.getElementById('otp').value.localeCompare(formData.otp) !== 0) {
      alert('wrong otp')
    } else {
      let a = addUserToDatabase();
      a.then(r => {
        if (r.status === 201) {
          // 201 is created
          alert('new publisher Added')
          stateObject.updateAppData(
            prev => {
              return {
                ...prev,
                userInfo: r.data.userInfo
              }
            }
          )
          localStorage.setItem('access', r.data.token.access)
          localStorage.setItem('refresh', r.data.token.refresh)
          localStorage.setItem('userLoggedIn', 1)
          localStorage.setItem('userType', props.variables.userType)
          navigate('/')
        } else if (r.status === 409) {
          // 409 is conflict
          alert('user already exists')
        } else {
          alert('user not added :(, server encountered some error, please try again later')
          navigate('/')
        }
      })
    }
  }

  function showContent(event) {
    let inputBox1 = document.getElementById('password1');
    inputBox1.type === 'password' ? inputBox1.type = 'text' : inputBox1.type = 'password'
    document.getElementById('password2').type = inputBox1.type;
  }

  function verifyForm(event) {
    event.preventDefault();
    if (checkUsername(formData.username) && checkPassword(formData.password1, formData.password2)) {
      // freeze the details
      document.getElementById('username').disabled = true;
      document.getElementById('password1').disabled = true;
      document.getElementById('password2').disabled = true;
      let promise = sendOtp(formData.username);
      promise.then(r => {
        if (r.status === 409) {
          alert('user already exists');
          document.getElementById('username').disabled = false;
          document.getElementById('password1').disabled = false;
          document.getElementById('password2').disabled = false;
        } else if (r.status === 200) {
          console.log(r);
          updateForm(prev => {
            return { ...prev, otp: r.otpFromServer }
          })
        }
      });
      promise.catch(err => {
        alert('some Error occured')
      })
    }
  }

  function handleChange(event) {
    updateForm(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  }

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={verifyForm} className='w-1/2'>
        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={2}>
          {/* row 1 */}
          <Grid item xs={7}>
            <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
              <h1 className='capitalize text-2xl font-semibold'>{props.variables.heading}</h1>
            </Box>
          </Grid>

          {/* row 2 */}
          <Grid item xs={7}>
            <TextField label='+91' onChange={handleChange} type='text' value={formData.username} name='username' id='username' fullWidth required />
          </Grid>

          {/* row 3 */}
          <Grid item xs={7}>
            <TextField label='password' onChange={handleChange} type='password' value={formData.password1} name='password1' fullWidth id='password1' required />
          </Grid>

          {/* row 4 */}
          <Grid item xs={7}>
            <TextField label='confirm password' onChange={handleChange} type='password' value={formData.password2} name='password2' fullWidth id='password2' required />
          </Grid>

          {/* row 5 */}
          <Grid item xs={7}>
            <FormControlLabel id='showPassword' control={<Checkbox />} onChange={showContent} label='show password' />
          </Grid>

          {/* row 6 */}
          {
            formData.otp !== null ?
              (<><Grid item xs={7}>
                <TextField label='otp' type='text' name='otp' fullWidth id='otp' required />
              </Grid>
                <Grid item xs={7}>
                  <Box display='flex' justifyContent='center'>
                    <Button variant='contained' onClick={verifyOtp}>confirm otp to signup</Button>
                  </Box>
                </Grid>
              </>
              ) : (
                <>
                  {/* row 7 */}
                  <Grid item xs={7}>
                    <Box display='flex' justifyContent='center'>
                      <Button variant='contained' type='submit'>send otp to signup</Button>
                    </Box>
                  </Grid>

                  {/* row 8 */}
                  <Grid item xs={7}>
                    <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
                      Already have an account?
                      {
                        props.variables.userType === 0 ? <NavLink to='/customer-login'> Login! </NavLink> : <NavLink to='/publisher-login'> Login! </NavLink>
                      }
                    </Box>
                  </Grid>
                </>
              )}
        </Grid>
      </form>
    </Box >
  );
}


function sendOtp(arg1) {
  async function getOtp(contactNumber) {
    let response = await fetch(`${baseUrl}otp/${contactNumber}/`, {
      method: 'GET'
    });
    let otp = await response.json();
    return otp;
  }
  let a = getOtp(arg1);
  return a;
}