/**
 * author: akash trivedi
 * date-created: 17-march-2022
 * functionality: render the new shop component
 * caller-function: ecommerce-frontend\src\publisher\components\Shops.js
 * performs-network-request: true
 */

import React from 'react';
import {
  Grid, TextField, Box, Button, fullWidth
} from '@mui/material'
import { useContext } from 'react';
import UserContext from '../../main/context/UserContext';
import ApplicationContext from '../../main/context/ApplicationContext';

let baseUrl = null

export default function NewShop() {
  baseUrl = useContext(ApplicationContext).appData.baseUrl
  const stateObject = useContext(UserContext)
  let [shopData, updateShop] = React.useState({
    name: '',
    pincode: '',
    address: '',
    city: '',
    state: ''
  });

  function getLocation(pincode) {

    async function getLocationInside(pincode) {
      let response = await fetch(`https://api.postalpincode.in/pincode/${pincode}/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })
      response = await response.json()
      return response
    }

    let location = getLocationInside(pincode)
    location.then(l => {
      if (l[0].PostOffice !== null) {
        l = {
          city: l[0].PostOffice[0].Division,
          state: l[0].PostOffice[0].State
        }
      } else {
        l = {
          city: 'invalid',
          state: 'invalid'
        }
      }
      updateShop((prevData) => {
        return {
          ...prevData,
          pincode: pincode,
          ...l
        }
      })
    })
    location.catch(err => {
      console.log('some error')
    })
  }

  function registerShop(event) {
    event.preventDefault();
    async function updateDetails(data) {
      let response = await fetch(`${baseUrl}publisher/shop/add/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      response = await response.json();
      return response;
    }
    let promise = updateDetails(shopData)
    promise.then(
      res => {
        if (res.status === 201) {
          alert('new shop added!')
          stateObject.updateAppData(
            prev => {
              return {
                ...prev,
                shops: res.shops
              }
            }
          )
        } else {
          alert('some error occured in server side')
        }
      }
    )
    promise.catch((error) => console.error('error is: ' + error));
  }

  function handleChange(event) {
    if (event.target.name.localeCompare('pincode') === 0 && event.target.value.length >= 6) {
      getLocation(event.target.value)
    } else {
      updateShop((prevData) => {
        return {
          ...prevData,
          [event.target.name]: event.target.value
        }
      })
    }
  }

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={registerShop} className='capitalize w-1/2'>
        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={2}>
          {/* row 2 */}
          <Grid item xs={12}>
            <TextField label='shop name' onChange={handleChange} type='text' value={shopData.name} name='name' fullWidth />
          </Grid>

          {/* row 3 */}
          <Grid item xs={6}>
            <TextField label='pincode' onChange={handleChange} type='text' value={shopData.pincode} name='pincode' fullWidth />
          </Grid>

          {/* row 4 */}
          <Grid item xs={6}>
            <TextField label='city' type='text' value={shopData.city} name='city' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='state' type='text' value={shopData.state} name='city' fullWidth />
          </Grid>

          {/* row 5 */}
          <Grid item xs={12}>
            <TextField label='address' onChange={handleChange} type='text' value={shopData.address} name='address' multiline maxRows={4} fullWidth />
          </Grid>
          <Box sx={{ py: 2, display: 'flex', justify: 'center' }}>
            <Grid item xs={12}>
              <Button variant='contained' color='primary' type='submit' >add</Button>
            </Grid>
          </Box>
        </Grid >
      </form>
    </Box>
  )
}
