import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Navbar, Nav } from 'react-bootstrap';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('http://localhost:3001/', { withCredentials: true })
      .then(res => {
        if(res.data.valid){
          setUserName(res.data.message);
        } else {
          navigate('/login');
        }
      })
      .catch(err => {
        console.error('Authentication error:', err);
        navigate('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    axios.post('http://localhost:3001/logout', {}, { withCredentials: true })
      .then(res => {
        navigate('/login');
      })
      .catch(err => {
        console.error('Logout error:', err);
      });
  };

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
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
        <Container>
          <Navbar.Brand href="#home">
            <strong>MERN Template</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                Welcome, <strong>{userName}</strong>!
              </Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className="hero-section bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={8} className="mx-auto text-center">
              <h1 className="display-4 fw-bold mb-4">
                Welcome, {userName}!
              </h1>
              <p className="lead mb-4">
                This is a basic MERN stack Template with authentication features including login and signup,
                password hashing using bcrypt, and JWT-based session management.
              </p>
              <p className="mb-4">
                Here is the GitHub link for this project:
                <br/>
                <a 
                  className="text-white fw-bold" 
                  href="https://github.com/denverdelamasa/mern-stack"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/denverdelamasa/mern-stack
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <style>
        {`
          .hero-section {
            min-height: 80vh;
            display: flex;
            align-items: center;
          }

          .feature-box {
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
            transition: transform 0.3s;
            height: 100%;
          }

          .feature-box:hover {
            transform: translateY(-5px);
          }

          .min-vh-75 {
            min-height: 75vh;
          }
        `}
      </style>
    </>
  );
};

export default Home;