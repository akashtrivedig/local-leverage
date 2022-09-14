/**
 * author: akash trivedi
 * date-created: 15-feb-2022
 * functionality: render all the components of the webpage, api calls to get the data
 * caller function: ecommerce-frontend/src/index.js
 * performs-network-request: false
 */

import './App.css';
import React from 'react';

import Header from './main/components/Header';
import Footer from './main/components/Footer';
import TagMenu from './main/components/TagMenu';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header title={'V2L'} />
      <TagMenu />
      <Outlet />
      <Footer />
    </>
  );
}
export default App;