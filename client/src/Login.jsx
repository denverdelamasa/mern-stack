import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
          if (result.data.success) {
              navigate('/')
          } else {
              setAlertVariant("danger");
              setAlertMessage(result.data.message);
              setShowAlert(true);
          }
      })
      .catch(err => {
          console.log(err);
          setAlertVariant("danger");
          setAlertMessage("An error occurred during login. Please try again.");
          setShowAlert(true);
      })
  } 

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          {/* Alert component */}
          {showAlert && (
            <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible className="mb-4">
              {alertMessage}
            </Alert>
          )}
          
          <div className="card shadow">
            <div className="card-body p-5">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
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
                    <div className="input-group">
                        <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        value={password || ""}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                        {showPassword ? (
                            <i className="bi bi-eye-slash"></i>
                        ) : (
                            <i className="bi bi-eye"></i>
                        )}
                        </button>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                  Login
                </button>
              </form>
              
              <div className="text-center mt-4">
                <p className="mb-0">Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;