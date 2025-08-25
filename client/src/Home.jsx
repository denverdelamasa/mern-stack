// TODO: 
// 1. make it so that when they type /home in the url bar without logging in, it redirects them to /login
// 2. make a logout button that redirects them to /login and clears any like... store login ??? I guess? 
// 3. make their name appear on the home page like "Welcome, [name]!"
// 4. add the most BOMBSHELL navbar type shiiiiiiiiiiiiiiiiiiiiiiiiiiiii
// 5. I gotta eat lunch bru xDDD

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <section className="hero-section bg-primary text-white py-5">
      <Container>
        <Row className="align-items-center min-vh-75">
          <Col lg={6}>
            <h1 className="display-4 fw-bold mb-4">
              Welcome to Our Amazing Platform
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