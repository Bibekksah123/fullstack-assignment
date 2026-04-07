# Real Estate Buyer Portal (MERN Stack)

A full-stack real estate buyer portal built with the **MERN stack** (MongoDB, Express, React, Node.js) featuring user authentication, property browsing, and favourites management.

## Features

- ✅ User registration and login (email + password)
- ✅ JWT authentication with token-based sessions
- ✅ Password hashing with bcrypt (no raw passwords stored)
- ✅ Buyer dashboard showing user name and role
- ✅ Property listings with rich data (type, sqft, description)
- ✅ Favourite/unfavourite functionality with heart animations
- ✅ Users can only see and modify their own favourites
- ✅ Server-side validation and error handling
- ✅ MongoDB database with Mongoose ODM
- ✅ Premium dark-themed UI with glassmorphism
- ✅ Responsive design (mobile + desktop)
- ✅ Loading skeletons and toast notifications

## Tech Stack

- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken), bcryptjs
- **Frontend**: React 18, Vite, React Router, Axios
- **Styling**: Vanilla CSS with custom design system

## Project Structure

```
fullstack-assignment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.js            # User schema + password hashing
│   │   │   ├── Property.js        # Property schema
│   │   │   └── Favourite.js       # Favourite schema (user-property)
│   │   ├── middleware/
│   │   │   └── auth.js            # JWT authentication middleware
│   │   ├── routes/
│   │   │   ├── auth.js            # Register, login, user info
│   │   │   ├── favourites.js      # Add/remove/list favourites
│   │   │   └── properties.js      # List properties
│   │   ├── seeds/
│   │   │   └── properties.js      # Sample property data (scalable)
│   │   └── index.js               # Express app entry point
│   ├── .env                       # Environment variables
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js           # Axios instance + API helpers
│   │   ├── components/
│   │   │   ├── layout/            # Navbar, Layout
│   │   │   ├── auth/              # LoginForm, RegisterForm
│   │   │   ├── properties/        # PropertyCard, PropertyGrid
│   │   │   └── favourites/        # FavouriteItem, FavouritesSidebar
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # React Context for auth state
│   │   ├── hooks/
│   │   │   └── useAuth.js         # Custom auth hook
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx       # Login/Register page
│   │   │   └── DashboardPage.jsx  # Main dashboard
│   │   ├── styles/
│   │   │   └── index.css          # Global CSS design system
│   │   ├── App.jsx                # Router + auth guard
│   │   └── main.jsx               # Vite entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## How to Run

### Prerequisites

- **Node.js** v18+
- **MongoDB** running locally on `mongodb://localhost:27017`

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Start the Backend Server

```bash
npm run dev
# or: npm start
```

The API runs at `http://localhost:3000`

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Start the Frontend Dev Server

```bash
npm run dev
```

The app runs at `http://localhost:5173`

### 5. (Optional) Seed Properties Manually

Properties auto-seed on first backend start. To re-seed:

```bash
cd backend
npm run seed
```

## Scalability

Adding new features is straightforward:

1. **New data model** → Add a file in `backend/src/models/`
2. **New API routes** → Add a file in `backend/src/routes/` and register in `index.js`
3. **New UI feature** → Add a component folder in `frontend/src/components/`
4. **New page** → Add to `frontend/src/pages/` and register a route in `App.jsx`
5. **More seed data** → Extend the array in `backend/src/seeds/properties.js`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/auth/me` | Get current user info (requires auth) |

### Properties
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Get all properties with favourite status |
| GET | `/api/properties/:id` | Get single property |

### Favourites
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/favourites` | Get user's favourites |
| POST | `/api/favourites/:propertyId` | Add property to favourites |
| DELETE | `/api/favourites/:propertyId` | Remove property from favourites |

## Security

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens expire after 24 hours
- Users can only access/modify their own favourites
- All favourite/property routes require authentication
- Server-side validation for all inputs
- Mongoose schema validation

## Database Schema (MongoDB)

**Users**
```
{ email, password (hashed), name, role, createdAt, updatedAt }
```

**Properties**
```
{ title, address, price, bedrooms, bathrooms, sqft, propertyType, description, imageUrl, createdAt, updatedAt }
```

**Favourites**
```
{ userId (ref User), propertyId (ref Property), createdAt, updatedAt }
// Compound unique index on (userId, propertyId)
```
