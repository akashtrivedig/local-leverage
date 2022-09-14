/**
 * author: akash trivedi
 * date-created: 
 * functionality: 
 * caller-function:
 * performs-network-request: true 
 */
import ApplicationContext from '../context/ApplicationContext';
import React from 'react';

export default function ApplicationState(props) {
  /**
   * userType: 0(customer), 1(publisher)
   */
  const [appData, updateAppData] = React.useState({
    baseUrl: 'http://localhost:8000/api/',
    tags: [],
    products: [],
    cart: {
      userId: null,
      products: [],
    },
    userLoggedIn: 0,
    userType: 0,
    totalSales: 0,
    shops: [],
    userInfo: {},
    products: [],
    publisherProducts: [],
    feedbacks: []
  });

  function setProducts(jsonArray) {
    updateAppData((prev) => { return { ...prev, products: jsonArray } });
  }

  function setTags(jsonArray) { updateAppData((prev) => { return { ...prev, tags: jsonArray } }); }

  React.useEffect(
    () => {
      async function getProducts(pincode) {
        let response = await fetch(`${appData.baseUrl}product/list-all/${pincode}/`, {
          method: 'GET',
          'Content-Type': 'application/json'
        });
        response = await response.json();
        return response;
      }
      async function getTags() {
        let response = await fetch(`${appData.baseUrl}product/tags/list-all/`,
          {
            method: 'GET',
            'Content-Type': 'application/json'
          });
        response = response.json();
        return response;
      }
      let tags = getTags()
      tags.then(
        res => {
          if (res.status === 200) {
            setTags(res.data)
          } else {
            setTags(res.data)
          }
        })
      tags.catch(
        (error) => {
          console.log('error encountered in tags was: ', error);
        })
      let products = getProducts(208012)
      products.then(res => setProducts(res))
      products.catch(
        (error) => {
          console.log('error encountered in products was: ', error);
        })
    }, []);

  return (
    <ApplicationContext.Provider
      value={{ appData, updateAppData }}
    >
      {props.children}
    </ApplicationContext.Provider>
  )
}