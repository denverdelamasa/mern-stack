# MERN Stack Authentication Template

A simple **MERN (MongoDB, Express, React, Node.js)** starter project with authentication. This template provides the essential building blocks for a login/signup system so you can quickly build and expand into a full application!

---

## 🚀 Features

* 🔐 User authentication (signup & login)
* 🛡️ Password hashing with **bcrypt**
* 📦 Backend API built with **Express** & **MongoDB**
* ⚛️ Frontend with **React** & **Vite**
* 📡 API requests handled via **Axios**
* 🔄 Ready-to-extend template for dashboards, CRUD apps, and more (Depending on your project)

---

## 📂 Project Structure

```
mern-stack/
├── client/ # Frontend (React + Vite)
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── Signup.jsx
│ │ └── main.jsx
│ ├── .gitignore
│ ├── eslint.config.js
│ ├── index.html
│ ├── package-lock.json
│ ├── package.json
│ └── vite.config.js
│
├── server/ # Backend (Node.js + Express + MongoDB)
│ ├── models/
│ │ └── Account.js
│ ├── node_modules/
│ ├── .env
│ ├── .gitignore
│ ├── index.js
│ ├── package-lock.json
│ └── package.json
│
├── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/denverdelamasa/mern-stack.git
cd mern-stack
```

### 2. Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

## 3. Setup Environment Variables

Create a `.env` file in the **backend** directory with the following keys:

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/account
JWT_ACCESS_SECRET=supersecret-access-key
JWT_REFRESH_SECRET=supersecret-refresh-key
```

### 4. Run the development servers

#### Start backend

```bash
cd server
npm start
```

#### Start frontend

```bash
cd client
npm run dev
```

Frontend runs on **[http://localhost:5173](http://localhost:5173)** and backend on **[http://localhost:3001](http://localhost:3001)** (by default).

---

## 🖼️ Usage

* Go to **[http://localhost:5173](http://localhost:5173)**
* Sign up for a new account
* Log in with your credentials
* After login, you’ll be redirected to the `Home` page (example protected route)

---

### 🛠 Troubleshooting

**MongoDB Permission Issues on Windows**  
Some users may encounter (because I did) an error when trying to start MongoDB due to **permission issues** if it’s installed inside `C:/Program Files`.

**Fix:**

1. Uninstall MongoDB.  
2. Reinstall it directly in `C:/` (e.g., `C:/MongoDB/`) instead of `C:/Program Files/`.  
3. Make sure the `mongod` service points to the new installation path.  

This avoids Windows permission conflicts and ensures MongoDB runs correctly!

---

## 🤝 Contributing

This is meant to be a starter template. Feel free to fork and adapt for your own projects. Contributions are welcome via pull requests!

Goodluck on your project!!!

---

## 📄 License

This project is open-source and available under the **MIT License**.