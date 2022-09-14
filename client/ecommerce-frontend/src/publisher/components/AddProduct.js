/**
 * author: akash trivedi
 * date-created: 8-march-2022
 * functionality: render the publisher's profile
 * caller-function: ecommerce-frontend\src\publisher\routes\PublisherPrivateRoutes.js
 * performs-network-request: true
 */
import React from 'react'
import { useLocation } from 'react-router-dom';
import {
  Grid, TextField, Avatar, MenuItem, FormHelperText, Select,
  FormControl, InputLabel, Box, Button
} from '@mui/material'

const { baseUrl } = useContext(ApplicationContext).appData

export default function Profile() {
  const [productData, updateProduct] = React.useState({})
  const location = useLocation();
  let formData = location.state.customUserInfo;

  function addProduct(event) {
    event.preventDefault()
    async function sendProduct(data) {
      let response = await fetch(``, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': ''
        }
      })
      response = await response.json()
      return response
    }
  }

  function handleChange(event) {
    updateProduct((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value
      }
    })
  }
  return (
    <div className='container p-4'>
      <form onSubmit={addProduct} className='capitalize'>
        <FormControl required margin='normal'>
          <InputLabel>shop</InputLabel>
          <Select name='shopId' label="" onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              formData.shops.map(shop => {
                <MenuItem value={shop.shopId}>{shop.shopName}</MenuItem>
              })
            }
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <div>
          <TextField variant='outlined' size='small' aria-readonly label='first name' type='text' value={formData.firstName} margin='normal' />
          <TextField variant='outlined' size='small' aria-readonly label='last name' type='text' value={formData.lastName} margin='normal' />
          <TextField variant='outlined' size='small' aria-readonly label='email' type='text' value={formData.email} margin='normal' fullWidth />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <TextField variant='outlined' size='small' aria-readonly label='dob' type='text' value={formData.dob} margin='normal' />
          <TextField variant='outlined' size='small' aria-readonly label='pincode' type='text' value={formData.pincode} margin='normal' />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <TextField variant='outlined' size='small' aria-readonly label='city' type='text' value={formData.city} margin='normal' />
          <TextField variant='outlined' size='small' aria-readonly label='state' type='text' value={formData.state} margin='normal' />
        </div>
        <div>
          <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <Button variant='contained' color='primary'>Update</Button>
          </Box>
        </div>
      </form>
    </div >
  )
}
