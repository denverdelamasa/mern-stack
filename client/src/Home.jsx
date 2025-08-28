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
        <Navbar.Brand href="/">
          <strong>MERN Template</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
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
            <h1 className="display-4 fw-bold mb-4 flex flex-row">Welcome, {userName}!</h1>
            <p className="lead mb-4">
              This is a basic MERN stack Template with authentication features including login and signup,
              password hashing using bcrypt, and JWT-based session management.
            </p>
            <p className="mb-4">
              Here is the GitHub link for this project:
              <br />
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

    {/* README content (Bootstrap-styled JSX) */}
    <div className="container my-4 mx-auto w-full">
      <div className="p-4 bg-body-secondary rounded shadow-sm">
        <header className="mb-3">
          <h1 className="h3 mb-1">MERN Stack Authentication Template</h1>
          <p className="text-muted mb-0">
            A simple <strong>MERN (MongoDB, Express, React, Node.js)</strong> starter project with
            authentication. This template provides the essential building blocks for a login/signup
            system so you can quickly build and expand into a full application!
          </p>
        </header>

        <hr />
        <section id="features" className="mb-4">
          <h2 className="h5">🚀 Features</h2>
          <ul className="list-group list-group-flush mt-2">
            <li className="list-group-item">🔐 <strong>User authentication</strong> (signup & login)</li>
            <li className="list-group-item">🛡️ Password hashing with <strong>bcrypt</strong></li>
            <li className="list-group-item">📦 Backend API built with <strong>Express</strong> & <strong>MongoDB</strong></li>
            <li className="list-group-item">⚛️ Frontend with <strong>React</strong> & <strong>Vite</strong></li>
            <li className="list-group-item">📡 API requests handled via <strong>Axios</strong></li>
            <li className="list-group-item">🔄 Ready-to-extend template for dashboards, CRUD apps, and more</li>
          </ul>
        </section>

        <hr />
        <section id="structure" className="mb-4">
          <h2 className="h5">📂 Project Structure</h2>
          <pre className="mt-2 mb-0 p-2 bg-white border rounded" style={{ overflow: 'auto' }}>
            <code>{`mern-stack/
├── client/ # Frontend (React + Vite)
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
├── server/ # Backend (Node.js + Express + MongoDB)
│   ├── models/
│   │   └── Account.js
│   ├── node_modules/
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│
├── README.md`}</code>
          </pre>
        </section>

        <hr />
        <section id="install" className="mb-4">
          <h2 className="h5">⚙️ Installation &amp; Setup</h2>

          <h3 className="h6 mt-3">1. Clone the repository</h3>
          <pre className="p-2 bg-white border rounded">
            <code>{`git clone https://github.com/denverdelamasa/mern-stack.git
cd mern-stack`}</code>
          </pre>

          <h3 className="h6 mt-3">2. Install dependencies</h3>
          <p className="mb-1"><strong>Backend</strong></p>
          <pre className="p-2 bg-white border rounded">
            <code>{`cd server
npm install`}</code>
          </pre>

          <p className="mb-1 mt-2"><strong>Frontend</strong></p>
          <pre className="p-2 bg-white border rounded">
            <code>{`cd ../client
npm install`}</code>
          </pre>

          <h3 className="h6 mt-3">3. Setup Environment Variables</h3>
          <p>Create a <code>.env</code> file in the <strong>server</strong> (backend) directory with:</p>
          <pre className="p-2 bg-white border rounded">
            <code>{`PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/account
JWT_ACCESS_SECRET=supersecret-access-key
JWT_REFRESH_SECRET=supersecret-refresh-key`}</code>
          </pre>

          <h3 className="h6 mt-3">4. Run the development servers</h3>
          <p className="mb-1"><strong>Start backend</strong></p>
          <pre className="p-2 bg-white border rounded">
            <code>{`cd server
npm start`}</code>
          </pre>

          <p className="mb-1 mt-2"><strong>Start frontend</strong></p>
          <pre className="p-2 bg-white border rounded">
            <code>{`cd client
npm run dev`}</code>
          </pre>

          <p className="small text-muted mt-2">
            Frontend runs on <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">http://localhost:5173</a> and backend on <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">http://localhost:3001</a> (by default).
          </p>
        </section>

        <hr />
        <section id="usage" className="mb-4">
          <h2 className="h5">🖼️ Usage</h2>
          <ol className="mt-2">
            <li>Open <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">http://localhost:5173</a></li>
            <li>Sign up for a new account</li>
            <li>Log in with your credentials</li>
            <li>After login, you’ll be redirected to the <code>Home</code> page (example protected route)</li>
          </ol>
        </section>

        <hr />
        <section id="troubleshooting" className="mb-4">
          <h2 className="h5">🛠 Troubleshooting</h2>
          <h3 className="h6 mt-2">MongoDB Permission Issues on Windows</h3>
          <p className="mb-1">Some users may encounter permission errors if MongoDB is installed inside <code>C:/Program Files</code>.</p>
          <p className="mb-1"><strong>Fix</strong>:</p>
          <ol>
            <li>Uninstall MongoDB.</li>
            <li>Reinstall directly in <code>C:/</code> (for example <code>C:/MongoDB/</code>).</li>
            <li>Ensure the <code>mongod</code> service points to the new installation path.</li>
          </ol>
          <p className="small text-muted">This avoids Windows permission conflicts and helps MongoDB run correctly.</p>
        </section>

        <hr />
        <section id="contribute" className="mb-2">
          <h2 className="h5">🤝 Contributing</h2>
          <p className="mb-2">This is a starter template—feel free to fork and adapt. Contributions are welcome via pull requests.</p>

          <h2 className="h5 mt-3">📄 License</h2>
          <p className="mb-0">This project is open-source and available under the <strong>MIT License</strong>.</p>
        </section>

        <footer className="mt-3 text-end">
          <small className="text-muted">Goodluck on your project!!!</small>
        </footer>
      </div>
    </div>

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