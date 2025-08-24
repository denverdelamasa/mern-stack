import React, { useState } from 'react';

const Login = () => {

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-5">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form>
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
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                  Login
                </button>
                
                <div className="text-center">
                  <a href="#forgot-password" className="text-decoration-none">
                    Forgot password?
                  </a>
                </div>
              </form>
              
              <div className="text-center mt-4">
                <p className="mb-0">Don't have an account? <a href="#signup" className="text-decoration-none">Sign up</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;