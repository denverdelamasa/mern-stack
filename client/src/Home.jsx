// TODO: 
// DONE 1. make it so that when they type /home in the url bar without logging in, it redirects them to /login
// 2. make a logout button that redirects them to /login and clears any like... store login ??? I guess? 
// DONE [email] 3. make their name appear on the home page like "Welcome, [name]!"
// 4. add the most BOMBSHELL navbar type shiiiiiiiiiiiiiiiiiiiiiiiiiiiii
// 5. I gotta eat lunch bru xDDD

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';

const Home = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('http://localhost:3001/', { withCredentials: true })
      .then(res => {
        if(res.data.valid){
          setMessage(res.data.message);
        } else {
          navigate('/login');
        }
      })
      .catch(err => {
        console.error('Authentication error:', err);
        navigate('/login');
      })
      .finally(() => {
        setLoading(false); // This will run regardless of success or error
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <section className="hero-section bg-primary text-white py-5">
      <Container>
        <Row className="align-items-center min-vh-75">
          <Col lg={6}>
            <h1 className="display-4 fw-bold mb-4">
              Welcome, you are: {message}
            </h1>
            <p className="lead mb-4">
              Discover the future of innovation with our cutting-edge solutions. 
              Join thousands of satisfied users who have transformed their experience.
            </p>
            <div className="d-flex gap-3">
              <Button variant="light" size="lg" className="px-4">
                Get Started
              </Button>
              <Button variant="outline-light" size="lg" className="px-4">
                Learn More
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;