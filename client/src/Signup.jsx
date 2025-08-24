import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';


// bro deepseek pregenerated a template for me to catchup to the youtube guy... 
// bruh I wonder what's the difference between a const and a function in react js...
const Signup = () => {
    // so like: name email password = what axios.post gonna send at the BACKEND type shiiiiii!!!!!!!
    //          ^    ^       ^
    //    setName setEmail setPassword = from the forms below

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('', {name, email, password})
        // so ts is like... fetch... so we can see in the browser console if there are errors type shiii???
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                        <h3 className="card-title text-center">Sign Up</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Sign Up
                            </button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;