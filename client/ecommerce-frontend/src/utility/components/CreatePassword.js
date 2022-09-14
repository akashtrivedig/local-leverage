/**
 * author: akash trivedi
 * date-created: 6-march-2022
 * functionality: render the page for password creation
 * caller-function: ecommerce-frontend\src\publisher\components\Register.js
 * performs-network-request: true
 */
import React from 'react'

const { baseUrl } = useContext(ApplicationContext).appData

export default function CreatePassword(props) {
  /**
   * renders two box for password creation with password matching ability
   */
  let userFinalData = props.data;
  let data = { "password1": "", "password2": "" };
  let style = { display: "none", color: "red" };

  function signUp(event) {
    console.log("signup called");

    async function sendUserData(data) {

      console.log("waiting for fetch to complete");
      try {
        let response = await fetch(`${baseUrl}register-cutomer/`, {
          method: "POST",
          type: "cors",
          body: `{
          "contact": "8980702003",
          "password": "1234"
        }`,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        console.log("fetch completed");
        response = await response.json();
        return response;
      } catch (error) {
        console.log(error);
      }
    }

    let a = sendUserData(userFinalData);
  }

  function showContent(event) {
    /**
     * every call updates the input type: text/password
     * sets the type of primary input to both inputs
     */

    var inputBox1 = document.getElementById("password1");
    (inputBox1.type === 'password' ? inputBox1.type = 'text' : inputBox1.type = 'password')
    document.getElementById("password2").type = inputBox1.type;
  }

  function isPasswordEqual(event) {
    /**
     * called to check if both the passwords are same or not, but only when the input box 2nd is not empty.
     */

    let a = document.getElementById('password-match');

    if (document.getElementById("password2").value.length !== 0) {
      if (data.password1.localeCompare(data.password2) == 0) {
        document.getElementById("confirm-otp").disabled = false;
        document.getElementById("signup").addEventListener("click", signUp);
        a.style.display = 'none';
      } else {
        a.style.display = 'inline-block';
      }
    } else {
      a.style.display = 'none';
    }
  }

  function updateData(event) {
    /**
     * updates the defualt value for the data object that was first initialized at the time of load the component with the new values.
     */

    userFinalData.password = event.target.value;
    data[event.target.id] = event.target.value;
    console.log(data);
    isPasswordEqual(event);
  }

  return (
    <div>
      {/* 2 box password password with show password*/}
      <label className="block mb-2 text-sm text-center font-bold text-gray-700" htmlFor="password">
        Password
      </label>
      <input
        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="password1"
        type="password"
        placeholder="******************"
        required
        name='password1'
        onChange={updateData}
      />
      <label className="block mb-2 text-sm text-center font-bold text-gray-700" htmlFor="c_password">
        Confirm Password
      </label>
      <input
        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="password2"
        type="password"
        placeholder="******************"
        required
        name='password2'
        onChange={updateData}
      />
      <span id='password-match' className="mb-2 text-sm font-bold text-gray-700" style={style}>passwords does not match</span>
      <p>
        <input type="checkbox" onClick={showContent} id="showPassword" />
        <label htmlFor="showPassword" className='text-sm font-bold'>show password</label>
      </p>
      <button id="signup" type='button'
        className="w-full mb-3 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">signup</button>
    </div>
  )
}