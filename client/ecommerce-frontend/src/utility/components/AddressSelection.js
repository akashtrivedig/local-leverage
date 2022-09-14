/**
 * author: akash trivedi
 * date-created: 13-march-2022
 * functionality: custom address selection for dilevery
 * caller-function: ecommerce-frontend\src\index.js
 * performs-network-request: false
 */
import { LocalGroceryStoreTwoTone } from '@material-ui/icons';
import React from 'react'
import locations from '../../AllowedLocations';


function AddressSelection() {
  /**
   * render the devlivery selection component
   */
  let [formData, setData] = React.useState({
    state: null,
    city: null,
    address: null
  })

  function sendDataToServer(event) {
    /**
     * 
     */

  }

  function changeState(event) {
    /**
     * update the address locations
     */
    setData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })

  }


  return (
    <div className='container'>
      <form onSubmit={sendDataToServer} method="get">
        <div>
          <label htmlFor="address">Delivery Address: </label>
          <textarea name="address" cols="10" rows="1" onChange={changeState}></textarea>
        </div>
        <select name='state' onChange={changeState}>
          <option value=''>select state</option>
          {
            Object.keys(locations.data).map(item => {
              return <option value={item}>{item}</option>
            })
          }
        </select>
        <select name='city' onChange={changeState}>
          <option value=''>select city</option>
          {
            formData.state !== null ? (
              locations.data[formData.state].map(item => {
                return <option value={item}>{item}</option>
              }))
              : null
          }
        </select>
      </form>
    </div>
  )
}

export default AddressSelection;