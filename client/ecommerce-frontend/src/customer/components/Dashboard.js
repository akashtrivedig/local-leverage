/**
 * author: akash trivedi
 * date-created: 10-march-2022
 * functionality: render the dashboard for the pubsliher
 * caller-function: 
 */
import React, { useContext } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ApplicationContext from '../../main/context/ApplicationContext';

export default function Dashboard(props) {
  /**
   * main dashboard for the publisher
   */
  const navigate = useNavigate()
  const stateObject = useContext(ApplicationContext)
  if (localStorage.getItem('userLoggedIn').localeCompare('0') === 0 || localStorage.getItem('userType').localeCompare('1') === 0) {
    navigate('/homepage')
  }
  const publisherActive = useLocation()
  let totalSales = 0;
  let sideNavContent = {
    name: [
      ['dashboard', 'profile'], ['feedbacks', 'feedbacks'], ['order history', 'order-history'], ['update profile', 'update-profile'],
    ]
  }
  let [publisherData, updateDashboard] = React.useState({
    shops: [],
    publisherInfo: {}
  });

  React.useEffect(() => {
    fetch(`http://localhost:8000/api/publisher/all-info/`, {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => { updateDashboard(response.data) })
      .catch(err => { console.log('some error occured: ' + err) })
  }, [])

  function logout(event) {
    event.preventDefault()
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.setItem('userLoggedIn', 0)
    localStorage.setItem('userType', 0)
    stateObject.updateAppData(
      prev => {
        return {
          ...prev,
          userLoggedIn: false
        }
      }
    )
    navigate('/homepage')
  }

  return (
    <div>
      <main className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative">
        <div className="flex items-start justify-between">
          <div className="h-screen hidden lg:block my-3 ml-4 shadow-lg relative w-60">
            <div className="bg-white h-full rounded-2xl dark:bg-gray-700">
              <div className="flex items-center justify-center pt-6">
              </div>
              <nav className="">
                {/* side navigation */}
                <div>
                  <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                    <img alt="profile" className="mx-auto object-cover rounded-full h-10 w-10 " />
                  </div>
                  {
                    sideNavContent.name.map((value) => {
                      return (
                        <span className="w-full font-thin capitalize text-blue-500 flex items-center p-3 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-blue-500">
                          <Link className="mx-4 text-sm font-normal" to={value[1]} state={publisherData}>{value[0]}</Link>
                        </span>
                      )
                    })
                  }
                </div>
              </nav>
            </div>
          </div>
          {/* right partition to navigation */}
          <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            {/* top bar for general information */}
            <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-2xl z-40">
              <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                  <div className="container relative left-0 z-50 flex w-3/4 h-auto h-full">
                    <span>Overall Sales: <span className='text-lime-500 font-semibold'> &#8377; {publisherData.totalSales}</span>&nbsp;|&nbsp;</span>
                    <span>Shops Registered: <span className='text-lime-500 font-semibold'>{publisherData.shops.length}</span></span>
                  </div>
                  <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                    <form onSubmit={logout}>
                      <Button color='primary' variant='contained' disableElevation type='submit'>logout</Button>
                    </form>
                  </div>
                </div>
              </div>
            </header>
            <Outlet />
          </div>
        </div>
      </main>
    </div >
  )
}
