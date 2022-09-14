/**
 * author: akash trivedi
 * date-created: 16-feb-2022
 * usage: render the product chosen from the the home page/any other page
 * caller function: ecommerce-frontend/src/main/components/ProductPreview.js
 * performs-network-request: true
 */

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Rating, Box, Grid
} from '@mui/material'
import ApplicationContext from '../context/ApplicationContext';

const { baseUrl } = useContext(ApplicationContext).appData

export default function Product() {
  let [product, setProduct] = React.useState({ product: null, feedbacks: [] });
  let { productId } = useParams();
  const stateObject = useContext(ApplicationContext)
  console.log(stateObject.appData.cart)
  let newPrice = null
  if (product.product !== null) {
    newPrice = product.product.price - (product.product.price * (product.product.discount / 100))
  }
  React.useEffect(() => {
    let feeedbackPromise = getFeedbacks(productId)
    feeedbackPromise.then(
      res => {
        setProduct((previousObject) => {
          return { ...previousObject, feedbacks: res.feedbacks }
        }
        )
      }
    )
    feeedbackPromise.catch(err => { console.log(`some error occured while getting feedbacks: ${err}`) })
    let productPromise = getProduct(productId)
    productPromise.then(res => setProduct(r => { return { ...r, product: res } }))
    productPromise.catch(
      (error) => {
        console.log('error encountered in tags was: ', error);
      })
  }, []);

  function addToCart(event) {
    stateObject.updateAppData(
      previousObject => {
        return {
          cart: {
            userId: null,
            products: getModifiedObject(previousObject.cart.products, product.product)
          },
          ...previousObject
        }
      }
    )
  }

  return (
    <Box sx={{ p: 2 }}>
      {
        product.product === null ? true : (
          <section className='text-gray-600 body-font overflow-hidden'>
            <div className='container px-12 py-5 mx-auto'>
              <div className='lg:w-4/5 mx-auto flex flex-wrap'>
                <img alt='ecommerce' className='lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded' src='https://dummyimage.com/400x400' />
                <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 capitalize'>
                  <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>
                    {product.product.companyName}
                  </h1>
                  <h2 className='text-gray-900 font-medium mb-1'>{product.product.name}</h2>
                  <div className='flex mb-4'>
                    <span className='flex items-center'>
                      <Rating name='simple-controlled' readOnly value={parseFloat(product.product.feedBackValue)} precision={0.5} />
                      <span className='text-gray-600 ml-3'>{product.product.totalFeedbacks} Reviews</span>
                    </span>
                  </div>
                  <p className='leading-relaxed'><strong>Description:</strong> {product.product.description}</p>
                  <div className='flex mt-4 items-center pb-5 border-b-2 border-gray-100 mb-3'>
                    <div className='flex'>
                      <span className='mr-3'>Color</span>
                      <i className='border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none'></i>
                    </div>
                    <div className='flex ml-6 items-center'>
                      <span className='mr-3'>Size</span>
                      <div className='relative'>{product.product.size}</div>
                    </div>
                  </div>
                  <div className='flex'>
                    <span className='title-font font-medium text-xl text-black'>
                      price: <i className='text-lime-700'>&#8377;{newPrice}</i>
                    </span>
                    <button className='flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded' onClick={addToCart}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <Grid container gap={2} sx={{ py: 2, justifyContent: 'center', display: 'flex' }} id='feedbacks'>
              {
                product.feedbacks.map(
                  sf => {
                    return <CustomerFeedback data={sf} />
                  }
                )
              }
            </Grid>
          </section>
        )
      }
    </Box>
  );
}

async function getProduct(id) {
  let response = await fetch(`${baseUrl}product/${id}/`,
    {
      method: 'GET',
      'Content-Type': 'application/json'
    });
  response = response.json();
  return response;
}

async function getFeedbacks(productId) {
  const link = `${baseUrl}product/feedbacks/${productId}/`
  let response = await fetch(
    link, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  response = await response.json()
  return response
}


function CustomerFeedback(props) {
  const f = props.data
  return (
    <Grid item xs={5} sx={{ p: 2, justifyContent: 'center', flexDirection: 'column', display: 'flex', minWidth: 250, minHeight: 250, maxWidth: 250, maxHeight: 350, bgcolor: '#F5F5F5', borderRadius: 10 }}>
      <h2 className='sm:text-2xl text-xl title-font font-medium text-gray-900 mb-2 capitalize'>{f.heading}</h2>
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

function getModifiedObject(cartItemList = [], productObject) {

  let currentQuantity = 0

  for (let i = 0; i < cartItemList.length; i++) {
    if (parseInt(cartItemList[i].productId) === parseInt(productObject.productId)) {
      currentQuantity = parseInt(cartItemList[i].quantity)
      break
    }
  }

  if (currentQuantity === 0) {
    // item was new to the list
    productObject.quantity = ++currentQuantity
    cartItemList.push(productObject)
  } else {
    productObject.quantity = ++currentQuantity
  }
  return cartItemList
}