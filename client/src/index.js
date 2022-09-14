/**
 * author: akash trivedi
 * date-created: 
 * functionality: root of the react app
 * caller-function: still to find may be node
 * performs-network-request: false
 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublisherPrivateRoutes from './publisher/routes/PublisherPrivateRoutes'
import CustomerPrivateRoutes from './customer/routes/CustomerPrivateRoutes'
import Product from './main/components/Product'
import ProductsOnTag from './main/components/ProductsOnTag'
import AddressSelection from './utility/components/AddressSelection'
import NotFound from './utility/components/NotFound'
import ShoppingCart from './customer/components/ShoppingCart'
import ApplicationState from './main/state/ApplicationState'
import Homepage from './main/components/Homepage'
import About from './main/components/About'
import Support from './main/components/Support'
import Login from './utility/components/Login'
import Signup from './utility/components/Signup'
import UserState from './main/state/UserState'

const websiteTitle = 'Vocal to Local'

const customerLoginVariables = {
  heading: 'customer ',
  userType: 0,
  link: 'http://127.0.0.1:8000/api/customer/login/'
}

const customerSignupVariables = {
  heading: 'join with us !',
  userType: 0,
  link: 'http://127.0.0.1:8000/api/customer/signup/'
}

const publisherLoginVariables = {
  heading: 'publisher',
  userType: 1,
  link: 'http://127.0.0.1:8000/api/publisher/login/'
}

const publisherSignupVariables = {
  heading: 'join with us as publisher!',
  userType: 1,
  link: 'http://127.0.0.1:8000/api/publisher/signup/'
}


ReactDOM.render(
  <ApplicationState>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App title={websiteTitle} />}>
          <Route path='homepage' element={<Homepage />} />
          <Route path='product'>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='tag'>
            <Route path=':tagId' element={<ProductsOnTag />} />
          </Route>
          <Route path='cart' element={<ShoppingCart />} />
          <Route path='about' element={<About />} />
          <Route path='support' element={<Support />} />
          <Route path='publisher-signup' element={<Signup variables={publisherSignupVariables} />} />
          <Route path='publisher-login' element={<Login variables={publisherLoginVariables} />} />
          <Route path='customer-login' element={<Login variables={customerLoginVariables} />} />
          <Route path='customer-signup' element={<Signup variables={customerSignupVariables} />} />
        </Route>
      </Routes>
      <UserState>
        <PublisherPrivateRoutes />
        <CustomerPrivateRoutes />
      </UserState>
    </BrowserRouter>
  </ApplicationState >,
  document.getElementById('root')
)