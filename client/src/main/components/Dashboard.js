/**
 * author: akash trivedi
 * date-created: 10-march-2022
 * functionality: render the dashboard for the pubsliher
 * caller-function: 
 * performs-network-request: false
 */
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Button, Avatar, Grid, Box
} from '@mui/material';
import { useContext } from 'react';
import UserContext from '../../main/context/UserContext';


export default function Dashboard() {
  let sideNavContent = null
  const navigate = useNavigate()
  const stateObject = useContext(UserContext)
  console.log(stateObject.userData);
  if (localStorage.getItem('userLoggedIn').localeCompare('0') === 0) {
    navigate('/homepage')
  }
  if (localStorage.getItem('userType').localeCompare('1') === 0) {
    sideNavContent = {
      name: [
        ['profile', 'profile'],
        ['your shops', 'shops'],
        ['your products', 'products'],
        ['product feedback', 'feedback'],
        ['add new product', 'new-product'],
        ['add new shop', 'new-shop'],
        ['update inventory', 'update-product'],
        ['order history', 'orders'],
        ['update profile', 'update-profile'],
      ]
    }
  } else {
    sideNavContent = {
      name: [
        ['dashboard', 'profile'],
        ['feedbacks', 'feedbacks'],
        ['order history', 'order-history'],
        ['update profile', 'update-profile'],
      ]
    }
  }

  React.useEffect(() => {
    let promise = getUserInfo(localStorage.getItem('userType'))
    promise.then(
      response => {
        stateObject.updateUserData(prev => {
          return {
            ...response.data
          }
        })
      }
    )
      .catch(err => { console.log('some error occured: ' + err) })
  }, [])

  function logout(event) {
    event.preventDefault()
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.setItem('userLoggedIn', 0)
    localStorage.setItem('userType', 0)
    stateObject.updateUserData(
      prev => {
        return {
          userInfo: {},
          shops: [],
          feedbacks: [],
          products: [],
          totalSales: 0,
          userLoggedIn: false
        }
      }
    )
    navigate('/homepage')
  }

  return (
    <Box sx={{ minWidth: 400, bgcolor: 'white' }}>
      <Grid container spacing={0}>

        {/* left side */}
        <Grid item xs={2}>
          <div className="h-full hidden lg:block shadow-lg relative w-full">
            <div className="bg-white h-full dark:bg-gray-700">
              <div className="relative flex items-center justify-end w-1/4 mr-4 sm:mr-0 sm:right-auto">
                <Avatar alt="Remy Sharp" sx={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>A</Avatar>
              </div>
              {
                sideNavContent.name.map((value) => {
                  return (
                    <span className="w-full font-thin capitalize text-blue-500 flex items-center p-3 transition-colors duration-200 justify-start">
                      <NavLink className="mx-4 text-sm font-normal" to={value[1]}>{value[0]}</NavLink>
                    </span>
                  )
                })
              }
            </div>
          </div>
        </Grid>

        {/* right partition to navigation */}
        <Grid item xs={10}>
          <Grid container spacing={0}>
            {/* header */}
            <Grid item xs={12}>
              <Grid container spacing={0} sx={{ p: 0 }}>
                <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16">
                  <div className="flex items-center justify-end p-2 mr-4 sm:mr-0 sm:right-auto">
                    {
                      parseInt(localStorage.getItem('userType')) !== 1 ?
                        true : (
                          <>
                            <Grid item xs={3} sx={{ px: 2 }}>
                              <span>Shops Registered: <span className='text-lime-500 font-semibold'>{stateObject.userData.shops.length}</span></span>
                            </Grid>
                            <Grid item xs={3}>
                              <span>product registered: <span className='text-lime-500 font-semibold'> &#8377; {stateObject.userData.products.length}</span>&nbsp;&nbsp;</span>
                            </Grid>
                            <Grid item xs={3}>
                              <span>Overall Sales: <span className='text-lime-500 font-semibold'> &#8377; {stateObject.userData.totalSales}</span>&nbsp;&nbsp;</span>
                            </Grid>
                          </>
                        )
                    }
                    <Grid item xs={2}>
                      <form onSubmit={logout}>
                        <Button color='primary' variant='contained' disableElevation type='submit'>logout</Button>
                      </form>
                    </Grid>
                  </div>
                </header>
              </Grid>
            </Grid>
            <Outlet />
          </Grid>
        </Grid >
      </Grid >
    </Box>
  )
}

async function getUserInfo(userType) {
  let link
  if (parseInt(userType) === 1) {
    link = 'http://localhost:8000/api/publisher/all-info/'
  } else {
    link = 'http://localhost:8000/api/customer/all-info/'
  }

  let response = await fetch(link, {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Content-Type': 'application/json'
    }
  })
  response = response.json()
  return response
}