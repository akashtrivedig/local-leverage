/**
 * author: akash trivedi
 * date-created: 16-feb-2022
 * usage: render the shopping cart
 * caller function: ecommerce-frontend/src/main/components/Header.js
 * bifercating remaining for the customer vs publisher's account login
 * performs-network-request: false
 */

import React from "react";
import { useLocation } from 'react-router-dom'

function Statistics() {
  const location = useLocation();
  let i = 0
  const shops = location.state.shops;
  return (
    <section className="text-gray-600 body-font">
      {/* for scrolling use classname=overflow-auto h-screen */}
      <div className="container px-0 py-4 mx-auto overflow-auto h-screen">
        <div className="flex flex-col text-center w-full mb-6">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Reports for all the Shops</h1>
          <p className="lg:w-6/7 mx-auto leading-relaxed text-base"></p>
        </div>
        <div className="lg:w-6/7 w-full mx-auto overflow-auto">
          <table className="table-auto w-full border-2 border-black whitespace-no-wrap">
            <thead className=" border-2 border-black">
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">SNo.</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Name</th>
                <th className="px-6 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Location</th>
                <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Sales(&#8377;)</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Best Seller</th>
                <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
              </tr>
            </thead>
            <tbody>
              {
                shops.map((shop) => {
                  ++i
                  return <SingleShopStatistic data={shop} count={i} key={shop.shopId} />
                })
              }
            </tbody>
          </table>
        </div>
      </div >
    </section >
  );
}

function SingleShopStatistic(props) {
  const shopData = props.data
  return (
    <tr className="capitalize">
      <td className="px-4 py-3">{props.count}</td>
      <td className="px-4 py-3">{shopData.name}</td>
      <td className="px-4 py-3">{shopData.address}, {shopData.city}, {shopData.state}</td>
      <td className="px-4 py-3">{shopData.sales}</td>
      <td className="px-4 py-3 text-lg text-gray-900">Free</td>
    </tr>
  );
}
export default Statistics;