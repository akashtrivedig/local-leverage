/**
 * author: akash trivedi
 * date-created: 15-march-2022
 * functionality: render the shops in the dashboard outlet
 * caller-function: ecommerce-frontend\src\publisher\components\Dashboard.js
 * performs-network-request: false
 */

import React, { useContext } from 'react'
import {
  Box, Grid, Rating, Button
} from '@mui/material'
import UserContext from '../../main/context/UserContext'
import { useNavigate, NavLink } from 'react-router-dom';

export default function Products(props) {
  console.log('publisher products are now rendered');
  const stateObject = useContext(UserContext)
  return (
    <Grid container sx={{ p: 2 }} gap={2}>
      {
        stateObject.userData.products.map(
          (product) => {
            return <SingleProduct product={product} key={product.productId} />
          }
        )
      }
    </Grid>
  );
}

function SingleProduct(props) {
  const stateObject = useContext(UserContext)
  const navigate = useNavigate()
  const product = props.product

  return (
    <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 250, minHeight: 350, maxWidth: 250, maxHeight: 350 }}>
      <div className='rounded-md overflow-hidden shadow-lg hover:scale-105'>
        <div>
          <img alt='ecommerce' className='object-cover object-center w-full h-full' src='https://dummyimage.com/420x260' />
        </div>
        <div className='p-2 bg-white h-20 w-30'>
          <h3 className='text-md font-semibold capitalize text-gray-900'>{product.companyName} {product.name + product.description}</h3>
        </div>
        <div className='px-2 bg-white font-semibold'>
          <i>shop: </i>
          <i>{getShopName(product.shopId, stateObject.userData.shops)}</i>
        </div>
        <div className='px-2 bg-white font-semibold'>
          <i>reviews: </i>
          <Rating name="simple-controlled" readOnly value={parseFloat(product.feedBackValue)} precision={0.5} />
          <i>({product.totalFeedbacks})</i>
        </div>
        <div className='py-2 px-3 bg-white'>
          <h3 className='text-sm font-semibold text-black'>
            <i>price: &nbsp;</i>
            <i className='text-lime-600'>&#8377;{product.price}</i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i>discount: &nbsp;</i>
            <i className='text-lime-600'>{product.discount}%</i>
          </h3>
        </div>
      </div>
    </Grid>
  )
}


function getShopName(shopid, list) {
  let name
  for (let i = 0; i < list.length; i++) {
    if (list[i].shopId === shopid) {
      name = list[i].name
    }
  }
  return name
}