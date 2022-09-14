/**
 * author: akash trivedi
 * date-created: 19-march-2022
 * functionality: render the feedbacks of the users related to publishers products
 * caller-function: ecommerce-frontend\src\publisher\components\Dashboard.js
 * performs-network-request: false
 */
import React, { useContext } from 'react'
import {
  Rating, Box, Grid
} from '@mui/material'
import UserContext from '../../main/context/UserContext'
import ApplicationContext from '../../main/context/ApplicationContext'

function FeedbackBlock(props) {
  let f = props.data
  let list = props.list
  return (
    <Grid item xs={4} sx={{ p: 2, justifyContent: 'center', flexDirection: 'column', display: 'flex', minWidth: 250, minHeight: 250, maxWidth: 250, maxHeight: 350, bgcolor: '#F5F5F5', borderRadius: 10 }}>
      <h2 className='sm:text-xl text-xl title-font font-medium text-gray-900 mb-2 capitalize'>
        {f.heading}</h2>
      <h2 className='sm:text-l text-l title-font font-medium text-gray-900 mb-2 capitalize'>
        <i>Product: {getProduct(f.productId, list).name}</i>
      </h2>
      <p className='leading-relaxed px-2'><i>{f.review}</i></p>
      <p className='leading-relaxed px-1'>
        <Rating name='read-only' value={parseFloat(f.starValue)} readOnly precision={0.5} />
      </p>
      <p className='leading-relaxed px-2'>
        <i><strong>dated:</strong> {f.timeStamp.slice(0, 10)}</i>
      </p>
    </Grid>
  )
}

function getProduct(id, list) {
  let product = null;
  for (let index = 0; index < list.length; index++) {
    if (list[index].productId === id) {
      product = list[index]
      break
    }
  }
  return product;
}
export default function Feedbacks() {
  const stateObject = useContext(UserContext)
  const applicationStateObject = useContext(ApplicationContext)
  const feedbacks = stateObject.userData.feedbacks
  const products = applicationStateObject.appData.products
  console.log(stateObject)

  return (
    <Box sx={{ p: 4, justifyContent: 'center', display: 'flex' }}>
      <Grid container gap={2}>
        {
          feedbacks.length === 0 ? true :
            (feedbacks.map((f) => {
              return <FeedbackBlock data={f} list={products} key={f.feedbackId} />
            }))
        }
      </Grid>
    </Box>
  )
}