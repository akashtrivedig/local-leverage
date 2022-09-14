/**
 * author: akash trivedi
 * date-created: 21-march-2022
 * functionality: render the page for updating the details of the customer
 * caller-function: ecommerce-frontend\src\main\components\Header.js
 * performs-network-request: true
 */
import React, { useContext } from 'react'
import UserContext from '../../main/context/UserContext'
import {
  Button, TextField, Grid, Avatar, Box
} from '@mui/material'
import {
  UploadFile
} from '@mui/icons-material'
import { grey } from '@mui/material/colors'
import ApplicationContext from '../../main/context/ApplicationContext'

const { baseUrl } = useContext(ApplicationContext).appData

export default function UpdateProfile(props) {
  const avatarSize = 250;
  const link = props.link
  const stateObject = useContext(UserContext)
  const u = stateObject.userData.userInfo
  let [formData, updateForm] = React.useState({
    first_name: u.first_name,
    last_name: u.last_name,
    email: u.email,
    dob: '',
    address: u.address,
    pincode: u.pincode,
    city: u.city,
    state: u.state,
    profilePhoto: u.profilePhoto,
    file: {}
  })


  function updateProfile(event) {
    event.preventDefault();

    let promise = updateDetails(formData, localStorage.getItem('userType'))
    promise.then(
      res => {
        if (res.status === 201) {
          alert('profile updated!')
          stateObject.updateAppData(
            prev => {
              return {
                ...prev,
                userInfo: res.userInfo
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
      const pincode = event.target.value
      let data = getLocation(pincode)
      data.then(l => {
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
        updateForm(prevData => {
          return {
            ...prevData,
            [event.target.name]: pincode,
            city: l.city,
            state: l.state
          }
        })
      }
      )
      data.catch(err => { console.log('some error') })
    }
    else if (event.target.name.localeCompare('profilePhoto') === 0) {
      if (event.target.files.length === 1 && event.target.files[0].type.localeCompare('image/jpeg') === 0) {
        updateForm(p => {
          return {
            ...p,
            [event.target.name]: event.target.files[0].name,
            file: event.target.files[0]
          }
        })
      } else {
        alert('selected file is invalid, choose only');
        updateForm(p => {
          return {
            ...p,
            [event.target.name]: null,
            file: null
          }
        })
      }
    }
    else {
      updateForm((prevData) => {
        return {
          ...prevData,
          [event.target.name]: event.target.value
        }
      })
    }
  }

  return (
    <div className='container p-8'>
      <Grid container spacing={2}>
        <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' sx={{ width: avatarSize, height: avatarSize, bgcolor: grey[500], alignContent: 'center' }}>A</Avatar>
          </div>
          <br />
          <div>
            <label htmlFor='fileUpload'>Upload File</label>
            <input id='fileUpload' type='file' name='profilePhoto' onChange={handleChange} />
          </div>
        </Grid>
        <Grid item xs={5} sx={{ justifyContent: 'center', display: 'flex' }}>
          <form onSubmit={updateProfile} className='capitalize' encType='multipart/form-data'>
            <div className='grid grid-cols-2 gap-4'>
              <TextField label='first name' onChange={handleChange} type='text' value={formData.first_name} name='first_name' margin='normal' />
              <TextField label='last name' onChange={handleChange} type='text' value={formData.last_name} name='last_name' margin='normal' />
            </div>
            <div>
              <TextField label='email' onChange={handleChange} type='text' value={formData.email} name='email' margin='normal' fullWidth />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <TextField label='dob' onChange={handleChange} type='text' value={formData.dob} name='dob' margin='normal' />
              <TextField label='pincode' onChange={handleChange} type='text' value={formData.pincode} name='pincode' margin='normal' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <TextField label='city' type='text' value={formData.city} name='city' margin='normal' aria-readonly />
              <TextField label='state' type='text' value={formData.state} name='city' margin='normal' aria-readonly />
            </div>
            <div>
              <TextField label='address' onChange={handleChange} type='text' value={formData.address} name='address' multiline maxRows={4} margin='normal' fullWidth />
            </div>
            <div>
              <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                <Button variant='contained' color='primary' type='submit'>Update</Button>
              </Box>
            </div>
          </form>
        </Grid>
      </Grid>
    </div >
  )
}

async function getLocation(pincode) {
  let response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
  response = await response.json()
  return response
}

async function updateDetails(data, userType) {
  console.log(data)
  let link = ''
  if (parseInt(userType) === 1) {
    link = `${baseUrl}publisher/profile/update/`
  } else {
    link = `${baseUrl}customer/profile/update/`
  }
  let response = await fetch(link, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  response = await response.json();
  return response;
}