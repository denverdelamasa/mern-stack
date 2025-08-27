# MERN Stack Authentication Starter

A robust, production-ready foundation for MERN stack applications with built-in authentication system. This starter template provides a clean architecture for building scalable web applications with MongoDB, Express.js, React, and Node.js.

## Overview

This project serves as a solid foundation for developers looking to build full-stack applications with user authentication. It implements industry best practices for security and code organization, making it ideal for:

- Learning MERN stack development
- University capstone projects
- Rapid prototyping
- Production applications

## Features

- **User Authentication**: Complete login/registration system with secure password hashing
- **JWT Support**: JSON Web Token implementation for session management
- **React Frontend**: Modern React implementation with Bootstrap UI
- **Express Backend**: RESTful API with proper middleware structure
- **MongoDB Integration**: Mongoose ODM with optimized schemas
- **Security**: Password encryption, CORS configuration, and environment variable protection

## Prerequisites

Before using this template, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mern-auth-starter
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   - Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

5. **Database Setup**
   - Install MongoDB Community Edition
   - Start MongoDB service:
   ```bash
   mongod
   ```

6. **Start the Application**
   - Run the backend server:
   ```bash
   cd server
   npm run dev
   ```
   
   - In a new terminal, run the frontend:
   ```bash
   cd client
   npm start
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
mern-auth-starter/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components (Login, Signup, Dashboard)
│   │   ├── services/      # API communication handlers
│   │   └── styles/        # CSS and styling files
│   └── package.json       # Frontend dependencies
│
├── server/                # Express backend application
│   ├── config/            # Database and app configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware (auth, validation)
│   ├── models/            # MongoDB models
│   ├── routes/            # API route definitions
│   └── package.json       # Backend dependencies
│
└── README.md              # Project documentation
```

## Available Scripts

### Server Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run test suite

### Client Scripts
- `npm start` - Start development server
- `npm build` - Create production build
- `npm test` - Launch test runner

## Learning Resources

This project was inspired by:
- [Login and Registration using MERN Stack](https://www.youtube.com/watch?v=ZVyIIyZJutM) by Code With Yousaf
- [MongoDB Community Server Edition](https://www.mongodb.com/try/download/community)

## Customization Guide

### Adding New Routes
1. Create new controller functions in `server/controllers/`
2. Define routes in `server/routes/`
3. Import and use routes in `server/index.js`

### Styling Modifications
- Bootstrap classes are used throughout the frontend
- Custom CSS can be added in `client/src/styles/`

### Database Schema Changes
- Modify models in `server/models/`
- Changes will automatically reflect through Mongoose

## Security Considerations

- Change the default JWT secret in production
- Implement rate limiting for authentication endpoints
- Add input validation and sanitization
- Use HTTPS in production environments
- Implement proper CORS policies for your domain

## Troubleshooting

Common issues and solutions:

1. **Connection refused to MongoDB**
   - Ensure MongoDB service is running
   - Verify connection string in `.env` file

2. **CORS errors**
   - Check backend CORS configuration in `server/index.js`

3. **Invalid JWT token**
   - Verify token expiration settings
   - Check secret key consistency

## Contributing

This project welcomes contributions and improvements. Please feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests

## License

This project is open source and available under the MIT License.

## Support

For questions and support:
- Create an issue in the GitHub repository
- Reference the tutorial video for basic setup questions

---

**Happy Coding!** This template provides everything you need to start building your MERN stack applications with confidence.