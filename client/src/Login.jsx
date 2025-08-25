import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  // so what handleSubmit does is that it prevents the "default" form submission behavior, 
  // which would typically cause a page reload...? what's a default btw... Instead, 
  // it uses axios to send a POST request to the server with the email and password.
  // since we at the login page, we only need the email and password
  // looking at my code I realize that I need to literally learn all the four (MERN) technologies...
  // like bro ts is so tuff </3 *rose emoji*
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log(result)
        // Handle successful login, e.g., store token, redirect, etc.
        if (result.data === "Success") {
          navigate('/home')
        }
        else {
          alert(result.data) 
          // Show error message cause the tutorial had none xDDD 
          // I dowanna look at my browser console everytime I login with wrong credentials
        }
      })
      .catch(err => console.log(err))
  }


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-5">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit}> {/* I forgot to add this onSubmit code xDDD whoopsies */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                  Login
                </button>
              </form>
              
              <div className="text-center mt-4">
                <p className="mb-0">Don't have an account? <a href="/signup" className="text-decoration-none">Sign up</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;