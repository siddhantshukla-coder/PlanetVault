# 🪐 PlanetVault

PlanetVault is a full-stack MERN application that allows users to securely manage and explore a shared planetary database. Users can create accounts, authenticate using JWT-based authorization, search planetary records, manage their profiles, and track their activity through personalized statistics.

---
## 🌍 Live Application

[Visit PlanetVault](https://planet-vault.vercel.app/)

## 🚀 Features

### Authentication & Security
- User Signup and Login
- JWT-based Authentication
- Protected Routes
- Password Hashing using bcrypt
- Automatic Authorization Header Injection using Axios Interceptors

### Planet Management
- Add New Planet Records
- Search Planets by Name
- Case-Insensitive Search using MongoDB Regex Queries
- Shared Planet Database accessible to all authenticated users

### User Profile
- View Profile Information
- Update Username
- Update Email
- Change Password
- Delete Account

### User Analytics
- Track Number of Planets Added
- Track Successful Planet Searches
- Persistent User Statistics stored in MongoDB

---

## 🏗️ Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcrypt

### Database
- MongoDB Atlas
- Mongoose
  
### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```text
PlanetVault
│
├── planetvault-frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── planetvault-backend
│   ├── models
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication Flow

1. User signs up with a username, email, and password.
2. Password is securely hashed using bcrypt.
3. User logs in and receives a JWT token.
4. Token is stored in localStorage.
5. Axios automatically attaches the token to protected requests.
6. Backend middleware verifies the token before granting access.

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|-----------|-------------|
| POST | `/signup` | Create a new account |
| POST | `/login` | Login and receive JWT |

### User

| Method | Endpoint | Description |
|----------|-----------|-------------|
| GET | `/profile` | Get user profile |
| PUT | `/editProfile` | Update profile |
| DELETE | `/deleteProfile` | Delete account |

### Planets

| Method | Endpoint | Description |
|----------|-----------|-------------|
| GET | `/planet` | Retrieve planets |
| GET | `/planet?name=jup` | Search planets |
| POST | `/planet` | Add new planet |
| PUT | `/planet/:id` | Update planet |

### Statistics

| Method | Endpoint | Description |
|----------|-----------|-------------|
| GET | `/getAddedSearched` | Fetch user stats |
| PUT | `/changeAddedSearched` | Update user stats |

---

## 🎯 Key Concepts Demonstrated

- Full-Stack Development
- REST API Design
- JWT Authentication
- Middleware Architecture
- MongoDB Querying
- Mongoose ODM
- React State Management
- Protected Frontend Routes
- Client-Server Communication
- User Account Management
- CRUD Operations
- Error Handling

---

## 📸 Screenshots

### Home Page
<img width="1872" height="902" alt="image" src="https://github.com/user-attachments/assets/b066c37a-dcff-4944-9868-6a4a5604ea57" />


### Login Page
<img width="1882" height="913" alt="image" src="https://github.com/user-attachments/assets/5e59fc6a-f8a6-4c40-944f-a3fa8a04205e" />


### Planet Search
<img width="1872" height="912" alt="image" src="https://github.com/user-attachments/assets/882d1072-499a-455f-911f-a8b33ba63e65" />


### Profile Page
<img width="1866" height="902" alt="image" src="https://github.com/user-attachments/assets/0dda1208-3382-41ed-9dfe-b7665e9d5648" />
<img width="1871" height="907" alt="image" src="https://github.com/user-attachments/assets/b2ba22a5-f99e-41c1-8585-a6c52bdece4e" />



---

## 🛠️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/planetvault.git
```

### Backend Setup

```bash
cd planetvault-backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start Backend:

```bash
node server.js
```

### Frontend Setup

```bash
cd planetvault-frontend
npm install
npm run dev
```

---

## 🌟 Future Improvements

- Planet Images
- Pagination for Search Results
- Advanced Filtering
- Role-Based Access Control
- Deployment on Vercel & Render
- Planet Categories and Tags
- Favorites and Bookmarks
- Search History

---

## 👨‍💻 Author

**Siddhant Shukla**
1st Year Project

IIT Bhilai | Electronics and Communication Engineering

Interested in AI/ML, Full-Stack Development, and Intelligent Systems.

---

## 📜 License

This project is intended for educational and portfolio purposes.
