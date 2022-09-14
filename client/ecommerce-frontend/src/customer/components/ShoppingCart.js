/**
 * author: akash trivedi
 * date-created: 10-march-2022
 * functionality: display the shopping cart with content
 * caller-function: ecommerce-frontend\src\index.js
 * performs-network-request: false
 */
import React, { useContext } from 'react'
import ApplicationContext from '../../main/context/ApplicationContext';
import {
  Grid, Box, TextField, Button
} from '@mui/material'


export default function ShoppingCart() {
  const stateObject = useContext(ApplicationContext)
  console.log(stateObject.appData.cart)
  return (
    <Box>
      <Grid container sx={{ p: 2, bgcolor: 'white', color: 'black' }} columnGap={1}>
        {
          stateObject.appData.cart.products.length === 0 ?
            (
              <>
                <Grid item xs={12} sx={{ py: 0, justifyContent: 'center', display: 'flex', color: 'black' }}>
                  <h1 className='sm:text-2xl text-xl title-font font-medium text-gray-900 mb-2 capitalize'>looks like you haven't added anything yet!</h1>
                </Grid>
                <Grid item xs={12} sx={{ py: 0, justifyContent: 'center', display: 'flex' }}>
                  <img src='https://www.anartline.com/image/catalog/cartEmpty.png' height='500' width='500' />
                </Grid>
              </>
            ) :
            (
              <>
                <Cart items={stateObject.appData.cart.products} />
              </>
            )
        }
      </Grid>
    </Box >
  )
}

function Cart(props) {
  const items = props.items
  const stateObject = useContext(ApplicationContext)

  function incrementQuantity(event) {
    stateObject.updateAppData(
      (previousObject) => {
        return {
          cart: {
            userId: null,
            products: getModifiedList(previousObject.cart.products, parseInt(event.target.id), 1)
          },
          ...previousObject
        }
      }
    )
  }

  function decrementQuantity(event) {
    stateObject.updateAppData(
      (previousObject) => {
        return {
          ...previousObject,
          cart: {
            userId: null,
            products: getModifiedList(previousObject.cart.products, parseInt(event.target.id), -1)
          }
        }
      }
    )
  }

  function removeProduct(event) {
    stateObject.updateAppData(
      (previousObject) => {
        return {
          ...previousObject,
          cart: {
            userId: null,
            products: removeItem(previousObject.cart.products, event.target.name)
          }
        }
      }
    )
  }

  function checkOut(event) {
    if (stateObject.appData.cart.userId === null) {
      alert('please log in to complete the order')
    }
  }

  return (
    <>
      <Grid item xs={8} sx={{ justifyContent: 'center', display: 'flex' }}>
        <Grid container gap={2}>
          {
            items.map(item => {
              return (
                <Grid item xs={12} sx={{ p: 3, bgcolor: '#F5F5F5', borderRadius: 7 }}>
                  <Grid container>
                    <Grid item xs={4}>
                      <span className='text-xl font-medium text-gray-900 title-font mb-2'>
                        {item.companyName + ' : ' + item.name}
                      </span>
                    </Grid>
                    <Grid item xs={4} sx={{ py: 0, justifyContent: 'center', display: 'flex' }}>
                      <span className='ml-2'>
                        <Button variant='contained' id={item.productId} color='primary' onClick={decrementQuantity}><strong>-</strong></Button>
                        <Button variant='text' aria-readonly>{item.quantity}</Button>
                        <Button variant='contained' id={item.productId} color='primary' onClick={incrementQuantity}><strong>+</strong></Button>
                      </span>
                    </Grid>
                    <Grid item xs={1} sx={{ mt: 0.5, justifyContent: 'center', display: 'flex' }}>
                      <span className='leading-relaxed font-semibold'>total: &#8377;{item.price * item.quantity}</span>
                    </Grid>
                    <Grid item xs={3} sx={{ justifyContent: 'center', display: 'flex' }}>
                      <Button variant='outlined' name={item.productId} color='error' size='small' onClick={removeProduct}><strong>remove</strong>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>

      <Grid item xs={3} sx={{ p: 4, bgcolor: '#F5F5F5', borderRadius: 7 }}>
        <Grid container sx={{}}>
          <Grid item xs={12} sx={{ py: 0, justifyContent: 'center', display: 'flex' }}>
            <h1 className='sm:text-2xl text-xl title-font font-medium text-gray-900 mb-2 capitalize'>cart summary</h1>
          </Grid>
          <Grid item xs={12} sx={{ py: 0, justifyContent: 'center', display: 'flex' }}>
            <Button onClick={checkOut} variant='contained' color='primary'>checkout</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

function getModifiedList(cartItemList, productId, incrementQuantity) {
  for (let i = 0; i < cartItemList.length; i++) {
    if (parseInt(cartItemList[i].productId) === parseInt(productId)) {
      if (cartItemList[i].quantity === 1 && incrementQuantity === -1) {
        break
      }
      cartItemList[i].quantity += incrementQuantity
      break
    }
  }
  return cartItemList
}

function removeItem(cartItemList, productId) {
  console.log(`to remove item number: ${productId}`);
  console.log(`to remove from: ${cartItemList}`);
  let newList = []
  for (let i = 0; i < cartItemList.length; i++) {
    if (parseInt(cartItemList[i].productId) === parseInt(productId)) {
      continue
    }
    newList.push(cartItemList[i])
  }
  return newList
}