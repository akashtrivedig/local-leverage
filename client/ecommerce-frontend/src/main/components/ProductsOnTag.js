/**
 * author: akash trivedi
 * date-created: 16-feb-2022
 * usage: render all the product preview on the homepage
 * caller function: ecommerce-frontend/src/App.js
 * performs-network-request: true
 */

import React, { useContext } from 'react';
import {
  Box, Grid
} from '@mui/material'
import { useParams } from 'react-router-dom';
import ProductPreview from './ProductPreview';
import ApplicationContext from '../context/ApplicationContext';

const { baseUrl } = useContext(ApplicationContext).appData

export default function Homepage() {
  const stateObject = useContext(ApplicationContext)
  let { tagId } = useParams();
  const products = stateObject.appData.products
  let [currentPage, setCurrentPage] = React.useState(0)

  React.useEffect(
    () => {
      fetch(`${baseUrl}product/tag/${tagId}/`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(res => res.json())
        .then(res => {
          stateObject.updateAppData(prev => {
            return {
              ...prev,
              products: res.products
            }
          })
        })
        .catch(err => { console.log(err) })
    }, [tagId]);

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