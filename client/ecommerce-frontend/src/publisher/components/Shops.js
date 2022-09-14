/**
 * author: akash trivedi
 * date-created: 15-march-2022
 * functionality: render the shops in the dashboard outlet
 * caller-function: ecommerce-frontend\src\publisher\components\Dashboard.js
 * performs-network-request: false
 */
import React, { useContext } from 'react'
import {
  Box,
  Grid
} from '@mui/material'
import UserContext from '../../main/context/UserContext'

function ShopBlock(props) {
  const { name, pincode, address, registrationDate, city, state, sales, productCount } = props.data
  const registrationDate1 = new Date(registrationDate)
  return (
    <Grid item xs={5}>
      <div className="text-black flex border-2 rounded-lg border-gray-700 border-opacity-50 p-4 sm:flex-row flex-col">
        <div className="w-8 h-8 sm:mr-8 sm:mb-0 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div className="flex-grow">
          <h2 className="text-lg title-font font-medium mb-2 capitalize">{name}</h2>
          <p className="leading-relaxed text-base font-semibold lowercase">
            address:&nbsp;<i className='font-normal capitalize'>{address}, {pincode}, {city}, {state}</i>
          </p>
          <p className="leading-relaxed text-base font-semibold lowercase">
            registration date: &nbsp;<i className='font-normal capitalize'>{registrationDate.slice(0, 10)}</i>
          </p>
          <p className="leading-relaxed text-base font-semibold lowercase">
            sale: &nbsp;<i className='font-semibold capitalize text-lime-500'>{sales}</i>&nbsp;&nbsp;
            items for sale: &nbsp;<i className='font-semibold capitalize text-lime-500'>{productCount}</i>
          </p>
        </div>
      </div>
    </Grid>
  );
}


export default function Shops() {
  const stateObject = useContext(UserContext)
  const shops = stateObject.userData.shops
  return (
    <Box sx={{ p: 2 }}>
      <Grid container rowGap={1} columnGap={1} direction="row" justifyContent="center" alignItems="center" >
        {
          shops === null || shops.length === 0 ? true : (
            shops.map((shop) => {
              return <ShopBlock data={shop} key={shop.shopId} />
            })
          )
        }
      </Grid>
    </Box>
  )
}
