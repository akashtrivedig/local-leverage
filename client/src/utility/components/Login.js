/**
 * author: akash trivedi
 * date-created: 10-march-2022
 * functionality: render the login page for the given user to login
 * caller-function: ecommerce-frontend\src\App.js
 * performs-network-request: true
 */

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Grid, Button, TextField, Box, FormControlLabel, Checkbox
} from '@mui/material';
import { useContext } from 'react'
import ApplicationContext from '../../main/context/ApplicationContext'

let baseUrl = null

export default function Login(props) {
  baseUrl = useContext(ApplicationContext).appData.baseUrl
  console.log('login component rendered');
  const navigate = useNavigate()
  const stateObject = useContext(ApplicationContext)
  let [formData, updateFormData] = React.useState({
    username: '', password: ''
  });

  function handleChange(event) {
    updateFormData(prev => {
      return {
        ...prev, [event.target.name]: event.target.value
      }
    })
  }

  function showContent(event) {
    let inputPassword = document.getElementById("password");
    inputPassword.type.localeCompare('password') === 0 ? inputPassword.type = 'text' : inputPassword.type = 'password'
  }

  function userLogin(event) {
    event.preventDefault()
    if (!(localStorage.hasOwnProperty('access') && localStorage.hasOwnProperty('refresh'))) {
      console.log('token was not set');
      let promise = refresh(formData)// returns promise
      promise.then(
        r => {
          if (!r.hasOwnProperty('detail')) {
            localStorage.setItem('access', r.access);
            localStorage.setItem('refresh', r.refresh);
            localStorage.setItem('userLoggedIn', true);
            if (props.variables.userType === 0) {
              localStorage.setItem('userType', 0);
            } else {
              localStorage.setItem('userType', 1);
            }
            stateObject.updateAppData(
              prev => {
                return {
                  ...prev,
                  userType: localStorage.getItem('userType'),
                  userLoggedIn: true
                }
              }
            )
            console.log(stateObject);
          }
          else {
            alert('user does not exists')
          }
        })
      promise.then(
        r => {
          let res = login(formData)
          res.then(res => {
            console.log('logged in');
          })
          res.catch(error => console.log(`error was : ${error}`))
        }
      )
    }
    else {
      let res = login(formData)
      res.then(res => {
        console.log(res);
      })
      res.catch(error => console.log(`error was : ${error}`))
    }

    if (localStorage.getItem('userType').localeCompare('1') === 0) {
      navigate('/publisher-dashboard')
    } else {
      navigate('/homepage')
    }
  }




  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={userLogin} className="w-1/2">
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>

          <Grid item xs={7}>
            <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
              <h1 className='capitalize text-2xl font-semibold'>{props.variables.heading} Login</h1>
            </Box>
          </Grid>

          <Grid item xs={7}>
            <TextField label='contact' onChange={handleChange} type='text' value={formData.contact} name='username' fullWidth autoComplete='false' />
          </Grid>

          <Grid item xs={7}>
            <TextField label='password' onChange={handleChange} type='password' value={formData.password} name='password' fullWidth id='password' autoComplete='false' />
          </Grid>

          <Grid item xs={7}>
            <FormControlLabel id="showPassword" control={<Checkbox />} onChange={showContent} label="show password" />
          </Grid>

          <Grid item xs={7}>
            <Box display='flex' justifyContent='center'>
              <Button variant='contained' type='submit'>Login</Button>
            </Box>
          </Grid>

          <Grid item xs={7}>
            <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
              Don't have an account?
              {
                props.variables.userType === 0 ? <NavLink to='/customer-signup'> Signup! </NavLink> : <NavLink to='/publisher-signup'> Signup! </NavLink>
              }
            </Box>
          </Grid>

        </Grid >
      </form >
    </Box >
  );
}

function login(data) {
  async function loginInside(data) {
    let response = await fetch(`${baseUrl}publisher/login/`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json'
      }
    })
    response = await response.json()
    return response
  }
  let r = loginInside(data)
  return r
}


function refresh(data) {
  async function refreshIndside(data) {
    let response = await fetch(`${baseUrl}token/`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    response = await response.json()
    return response
  }
  let a = refreshIndside(data)
  return a
}
