/**
 * author: akash trivedi
 * date-created: 11-march-2022
 * functionality: creates new routes for the specified url starting with 'publisher'
 * caller-function: ecommerce-frontend\src\index.js
 * performs-network-request: false
 */

import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Dashboard from '../../main/components/Dashboard'
import Profile from '../../utility/components/Profile'
import UpdateProfile from '../../utility/components/UpdateProfile'
import Feedbacks from '../components/Feedbacks'



export default function CustomerPrivateRoutes() {
  return (
    <Routes>
      <Route path='customer-dashboard/' element={<Dashboard />}>
        <Route path='profile' element={<Profile />} />
        <Route path='feedbacks' element={<Feedbacks />} />
        <Route path='update-profile' element={<UpdateProfile link={'http://localhost:8000/api/customer/publisher-update-profile/'} />} />
      </Route>
    </Routes>
  )
}
