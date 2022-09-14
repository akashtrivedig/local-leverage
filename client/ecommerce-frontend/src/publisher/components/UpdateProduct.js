/**
 * author: akash trivedi
 * date-created: 17-march-2022
 * functionality: renders new product form
 * caller-function: ecommerce-frontend\src\index.js
 * performs-network-request: true
 */
import React, { useContext } from 'react'
import {
  Grid, TextField, MenuItem, Select,
  FormControl, InputLabel, Box, Button
} from '@mui/material'
import ApplicationContext from '../../main/context/ApplicationContext';
import UserContext from '../../main/context/UserContext';

const { baseUrl } = useContext(ApplicationContext).appData

export default function NewProduct() {
  const applicationStateObject = useContext(ApplicationContext)
  const stateObject = useContext(UserContext)
  let stocks = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  let discounts = [0, 5, 10, 12, 15, 17, 20, 22, 25, 33]
  let colors = ['white', 'grey', 'black', 'red', 'green', 'blue', 'yellow', 'brown']
  let [product, updateProduct] = React.useState({
    products: [],
    name: '',
    companyName: '',
    description: '',
    stock: '0',
    price: '0',
    size: '-',
    color: '',
    discount: '0',
    edition: '-',
    shopId: '',
    tagId: ''

  })

  console.log(product);

  function updateProductOnServer(event) {
    event.preventDefault();
    console.log(product)
    let promise = updateInventory(product)
    promise.then((response) => console.log('updated product is :'))
    promise.then((response) => console.log(response))
    promise.catch((error) => console.error("error is: " + error));
  }

  function handleChange(event) {

    if (event.target.name.localeCompare('shopId') === 0) {
      updateProduct((prevData) => {
        return {
          ...prevData,
          products: getProductList(stateObject.userData.products, event.target.value)
        }
      })
    }

    else if (event.target.name.localeCompare('productId') === 0) {
      updateProduct(prev => {
        console.log(prev)
        return {
          ...prev,
          ...getProductInfo(product.products, event.target.value)
        }
      }
      )
    } else {

      updateProduct((prevData) => {
        return {
          ...prevData,
          [event.target.name]: event.target.value
        }
      })
    }
  }

  return (
    <Box sx={{ p: 4, justifyContent: 'center', display: 'flex' }}>
      <form onSubmit={updateProductOnServer}>
        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={2}>

          {/* single row */}
          <Grid item xs={12}>
            <FormControl fullWidth required margin='normal' >
              <InputLabel>shop</InputLabel>
              <Select name='shopId' label='shop' onChange={handleChange} required variant='outlined'>
                {
                  stateObject.userData.shops.map(shop => {
                    return <MenuItem value={shop.shopId} onChange={handleChange}>{shop.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>

          {/* row 2 */}
          <Grid item xs={12}>
            <FormControl fullWidth required margin='normal' >
              <InputLabel>product</InputLabel>
              <Select name='productId' label='product' onChange={handleChange} required variant='outlined'>
                {
                  product.products.map(product => {
                    return <MenuItem value={product.productId} onChange={handleChange}>{`${product.companyName}: ${product.name}`}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>

          {/* third row */}
          <Grid item xs={2}>
            <TextField fullWidth margin='normal' type='text' min='50' label='Price' onChange={handleChange} name='price' required value={product.price} />
          </Grid>

          <Grid item xs={2}>
            <FormControl fullWidth required margin='normal'>
              <InputLabel>stock</InputLabel>
              <Select name='stock' label='stock' onChange={handleChange} required>
                {
                  stocks.map(value => {
                    return <MenuItem value={value}>{value}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl fullWidth required margin='normal' >
              <InputLabel>color</InputLabel>
              <Select name='color' label='color' onChange={handleChange} required>
                {
                  colors.map(value => {
                    return <MenuItem value={value}>{value}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl fullWidth margin='normal' >
              <InputLabel>tags</InputLabel>
              <Select name='tagId' label='tag' onChange={handleChange}>
                {
                  applicationStateObject.appData.tags.map(tag => {
                    return <MenuItem value={tag.tagId}>{tag.tagName}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl fullWidth required margin='normal' >
              <InputLabel>discount</InputLabel>
              <Select name='discount' label='discount' onChange={handleChange} required>
                {
                  discounts.map(value => {
                    return <MenuItem value={value}>{value}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <TextField fullWidth margin='normal' type='text' min='50' className='form-control' label='Edition' onChange={handleChange} name='edition' value={product.edition} />
          </Grid>

          <Grid item xs={2}>
            <TextField fullWidth margin='normal' type='text' min='50' className='form-control' label='Size' onChange={handleChange} name='size' value={product.size} />
          </Grid>

        </Grid>
        <div>
          <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <Button variant='contained' color='primary' margin='normal' type='submit'>update</Button>
          </Box>
        </div>
      </form>
    </Box>
  )
}


function getProductList(list, id) {
  let filteredList = [];
  for (let index = 0; index < list.length; index++) {
    if (list[index].shopId === id) {
      filteredList.push(list[index])
    }
  }
  return filteredList;
}

function getProductInfo(productList, id) {
  let productInfo
  console.log(`product list is : ${productList}`)
  for (let index = 0; index < productList.length; index++) {
    if (productList[index].productId === id) {
      console.log(productList[index])
      productInfo = productList[index]
    }
  }
  console.log(`info from function : ${productInfo}`)
  return productInfo
}

async function updateInventory(data) {
  data.price = parseInt(data.price)
  console.log(data.price);
  let response = await fetch(`${baseUrl}product/update/`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  response = await response.json();
  return response;
}