/**
 * author: akash trivedi
 * date-created: 16-feb-2022
 * usage: render all the product preview on the homepage
 * caller function: ecommerce-frontend/src/App.js
 * performs-network-request: false
 */

import React, { useContext } from 'react';
import {
  Box, Grid, Pagination
} from '@mui/material'

import ProductPreview from './ProductPreview';
import ApplicationContext from '../context/ApplicationContext';

export default function Homepage() {
  const stateObject = useContext(ApplicationContext)
  const products = stateObject.appData.products
  let [currentPage, setCurrentPage] = React.useState(0)
  console.log(stateObject.appData)
  return (
    <section className='text-gray-600 body-font'>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {
            products.length === 0 ? 'no content' : (
              products.map(product => {
                return < ProductPreview product={product} key={product.id} />
              }
              )
            )
          }
        </Grid>
      </Box>
    </section>
  );
}
{/* <Pagination count={10} shape="rounded" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} /> */ }

