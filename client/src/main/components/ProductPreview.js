/**
 * author: akash trivedi
 * date-created: 16-feb-2022
 * usage: render the single product preview on the homepage from the data recieved.
 * caller function: src/main/components/Main.js
 * performs-network-request: false
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Grid, Rating
} from '@mui/material'

export default function ProductPreview(props) {

  const product = props.product
  const newPrice = product.price - (product.price * (product.discount / 100))

  return (
    <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 250, minHeight: 400, maxWidth: 250, maxHeight: 400 }}>
      <div className='rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-750 cursor-pointer'>
        <NavLink to={`/product/${product.productId}/`} key={product.productId}>
          <div>
            <img alt='ecommerce' className='object-cover object-center' src='https://reactjsexample.com/content/images/2016/08/20160828182925.jpg' />
          </div>
          <div className='p-2 bg-white h-20 w-30'>
            <h3 className='text-md font-semibold capitalize text-gray-900'>{product.companyName} {product.name + product.description}</h3>
          </div>
          <div className='px-2 bg-white'>
            <Rating name="simple-controlled" readOnly value={parseFloat(product.feedBackValue)} precision={0.5} />
          </div>
          <div className='py-2 px-3 bg-white'>
            <h3 className='text-sm font-semibold text-black'>
              {
                parseInt(product.discount) !== 0 ?
                  (
                    <>
                      <i>price: &nbsp;
                        <strike className='text-red-700'>&#8377;{product.price} &nbsp;</strike>
                      </i>
                      <i className='text-lime-600'>&#8377;{newPrice}</i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <i>discount: &nbsp;</i>
                      <i className='text-lime-600'>{product.discount}%</i>
                    </>
                  ) :
                  (
                    <>
                      <i>price: &nbsp;
                        <i className='text-lime-600'>&#8377;{product.price} &nbsp;</i>
                      </i>
                    </>
                  )
              }
            </h3>
          </div>
        </NavLink>
      </div>
    </Grid>
  );
}
