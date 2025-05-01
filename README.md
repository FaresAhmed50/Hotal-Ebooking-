# Hotel Booking Backend API

This is the backend API for a hotel booking system, built with Node.js, Express, Prisma, and MySQL. It provides endpoints for user authentication, hotel and room management, booking, reviews, payments, and admin user management. The API uses JSON Web Tokens (JWT) for authentication and supports role-based access (`user` and `admin`).

This documentation is designed for frontend developers to understand the API's structure, endpoints, and integration requirements.

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Authentication Routes](#authentication-routes)
  - [Hotel Routes](#hotel-routes)
  - [Booking Routes](#booking-routes)
  - [Review Routes](#review-routes)
  - [Payment Routes](#payment-routes)
- [Error Handling](#error-handling)
- [Example Requests](#example-requests)
- [Security Notes](#security-notes)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

```
hotel-booking-backend/
├── controllers/
│   ├── authController.js        # User authentication and admin user management
│   ├── hotelController.js       # Hotel and room management
│   ├── bookingController.js     # Booking operations
│   ├── reviewController.js      # Review operations
│   └── paymentController.js     # Payment operations
├── middlewares/
│   ├── authMiddleware.js        # JWT authentication
│   └── isAdmin.js               # Admin role check
├── models/
│   └── prisma.js                # Prisma Client instance
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Prisma migrations
├── routes/
│   ├── authRoutes.js            # Authentication and user management routes
│   ├── hotelRoutes.js           # Hotel and room routes
│   ├── bookingRoutes.js         # Booking routes
│   ├── reviewRoutes.js          # Review routes
│   └── paymentRoutes.js         # Payment routes
├── scripts/
│   └── setAdmin.js              # Script to set a user as admin
├── .env                         # Environment variables
├── app.js                       # Main application entry point
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## Prerequisites

- **Node.js** (v16 or higher)
- **MySQL** (v8 or higher)
- **npm** (v8 or higher)
- A MySQL database named `hotel_booking`
- Basic understanding of REST APIs, JWT authentication, and JSON

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Mohamedh0/Hotal-Ebooking-.git
   cd hotel-booking-backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=hotel_booking
   PORT=3000
   JWT_SECRET=8f7b3c9d2a4e6f8b1c0d5e7a9f3b2c4d6e8a0b1f2c3d4e5f6a7b8c9d0e1f2
   DATABASE_URL="mysql://your_mysql_username:your_mysql_password@localhost:3306/hotel_booking"
   ```
   Replace `your_mysql_username` and `your_mysql_password` with your MySQL credentials.

4. **Set Up the Database**:
   - Ensure MySQL is running.
   - Create the `hotel_booking` database:
     ```sql
     CREATE DATABASE hotel_booking;
     ```
   - Apply Prisma migrations to create tables:
     ```bash
     npx prisma migrate dev --name init
     ```
   - Generate Prisma Client:
     ```bash
     npx prisma generate
     ```

5. **Set an Admin User**:
   - Register a user via the API (see [Authentication Routes](#authentication-routes)).
   - Run the admin script to set a user as admin:
     ```bash
     node scripts/setAdmin.js
     ```
     This sets the user with `id=1` as an admin. Modify the script to change other users.

6. **Start the Server**:
   ```bash
   npm start
   ```
   The API will run at `http://localhost:3000`.

7. **Test the API**:
   Use tools like **Postman**, **cURL**, or your frontend application to test endpoints.

## Database Schema

The database (`hotel_booking`) consists of six tables, defined in `prisma/schema.prisma`:

1. **User**:
   - `id`: Integer, Primary Key, Auto-increment
   - `username`: String (VARCHAR(100))
   - `email`: String (VARCHAR(100), Unique)
   - `passwordHash`: String (VARCHAR(255))
   - `preferences`: Text (optional)
   - `createdAt`: DateTime, Default: now()
   - `role`: Enum (`user`, `admin`), Default: `user`
   - Relations: `bookings`, `reviews`, `payments`

2. **Hotel**:
   - `id`: Integer, Primary Key, Auto-increment
   - `name`: String (VARCHAR(100))
   - `location`: String (VARCHAR(255))
   - `description`: Text (optional)
   - `starRating`: Integer (optional)
   - `amenities`: Text (optional)
   - `contactInfo`: String (VARCHAR(255), optional)
   - Relations: `rooms`, `reviews`

3. **Room**:
   - `id`: Integer, Primary Key, Auto-increment
   - `hotelId`: Integer, Foreign Key to `Hotel`
   - `roomType`: String (VARCHAR(50))
   - `price`: Decimal (10,2)
   - `availability`: Boolean, Default: true
   - `features`: Text (optional)
   - Relations: `hotel`, `bookings`

4. **Booking**:
   - `id`: Integer, Primary Key, Auto-increment
   - `userId`: Integer, Foreign Key to `User`
   - `roomId`: Integer, Foreign Key to `Room`
   - `checkInDate`: Date
   - `checkOutDate`: Date
   - `totalPrice`: Decimal (10,2)
   - `bookingStatus`: String (VARCHAR(50))
   - `timestamp`: DateTime, Default: now()
   - Relations: `user`, `room`, `payment`

5. **Review**:
   - `id`: Integer, Primary Key, Auto-increment
   - `userId`: Integer, Foreign Key to `User`
   - `hotelId`: Integer, Foreign Key to `Hotel`
   - `rating`: Integer
   - `comment`: Text (optional)
   - `timestamp`: DateTime, Default: now()
   - Relations: `user`, `hotel`

6. **Payment**:
   - `id`: Integer, Primary Key, Auto-increment
   - `bookingId`: Integer, Foreign Key to `Booking`, Unique
   - `userId`: Integer, Foreign Key to `User`
   - `amount`: Decimal (10,2)
   - `paymentMethod`: String (VARCHAR(50))
   - `paymentStatus`: String (VARCHAR(50))
   - `timestamp`: DateTime, Default: now()
   - Relations: `user`, `booking`

## Authentication

- **JWT Authentication**: Most endpoints require a JWT token in the `Authorization` header as `Bearer <token>`.
- **Roles**:
  - `user`: Can book rooms, leave reviews, make payments, and view their bookings.
  - `admin`: Can manage hotels, rooms, and users (update, delete, fetch by email, set admin roles).
- **How to Authenticate**:
  1. Register a user via `POST /api/auth/register`.
  2. Log in via `POST /api/auth/login` to receive a JWT token.
  3. Include the token in requests to protected endpoints.

## API Endpoints

All endpoints are prefixed with `http://localhost:5000/api`.

### Authentication Routes

#### POST `/auth/register`
Register a new user.

**Request**:
```json
{
  "username": "JohnDoe",
  "email": "john@example.com",
  "password": "password123",
  "preferences": "no smoking"
}
```

**Response**:
- `201 Created`:
  ```json
  { "message": "User registered successfully", "userId": 1 }
  ```
- `400 Bad Request`: Invalid input or email already registered.
- `500 Internal Server Error`: Server error.

#### POST `/auth/login`
Log in and receive a JWT token.

**Request**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
- `200 OK`:
  ```json
  { "token": "jwt_token" }
  ```
- `401 Unauthorized`: Invalid credentials.
- `400 Bad Request`: Missing fields.
- `500 Internal Server Error`: Server error.

#### POST `/auth/set-admin` (Admin Only)
Set a user as an admin.

**Headers**:
- `Authorization: Bearer <jwt_token>`

**Request**:
```json
{ "userId": 2 }
```

**Response**:
- `200 OK`:
  ```json
  { "message": "User 2 set to admin", "user": { "id": 2, "username": "JaneDoe", ... } }
  ```
- `400 Bad Request`: Missing `userId`.
- `404 Not Found`: User not found.
- `403 Forbidden`: Non-admin access.
- `500 Internal Server Error`: Server error.

#### PUT `/auth/users/:id` (Admin Only)
Update user information.

**Headers**:
- `Authorization: Bearer <jwt_token>`

**Request**:
```json
{
  "username": "JaneDoe",
  "email": "jane@example.com",
  "preferences": "non-smoking",
  "password": "newpassword123",
  "role": "user"
}
```

**Response**:
- `200 OK`:
  ```json
  { "message": "User updated successfully", "user": { "id": 2, "username": "JaneDoe", ... } }
  ```
- `400 Bad Request`: Invalid input or email in use.
- `404 Not Found`: User not found.
- `403 Forbidden`: Non-admin access.
- `500 Internal Server Error`: Server error.

#### DELETE `/auth/users/:id` (Admin Only)
Delete a user and their related data (bookings, reviews, payments).

**Headers**:
- `Authorization: Bearer <jwt_token>`

**Response**:
- `200 OK`:
  ```json
  { "message": "User 2 deleted successfully" }
  ```
- `400 Bad Request`: Invalid ID or attempting self-deletion.
- `404 Not Found`: User not found.
- `403 Forbidden`: Non-admin access.
- `500 Internal Server Error`: Server error.

#### GET `/auth/users/by-email` (Admin Only)
Retrieve a user by email.

**Headers**:
- `Authorization: Bearer <jwt_token>`

**Query Parameters**:
- `email`: The user’s email (e.g., `john@example.com`)

**Example**:
```
GET /api/auth/users/by-email?email=john@example.com
```

**Response**:
- `200 OK`:
  ```json
  {
    "message": "User retrieved successfully",
    "user": {
      "id": 1,
      "username": "JohnDoe",
      "email": "john@example.com",
      "preferences": "no smoking",
      "createdAt": "2025-04-27T12:00:00.000Z",
      "role": "user"
    }
  }
  ```
- `400 Bad Request`: Missing or invalid email.
- `404 Not Found`: User not found.
- `403 Forbidden`: Non-admin access.
- `500 Internal Server Error`: Server error.

### Hotel Routes

#### POST `/AddHotels` (Admin Only)
Create a new hotel.

**Headers**:
- `Authorization: Bearer <jwt_token>`

**Request**:
```json
{
  "name": "Grand Hotel",
  "location": "123 Main St",
  "description": "Luxury hotel",
  "starRating": 5,
  "amenities": "pool, wifi",
  "contactInfo": "info@grandhotel.com"
}
```

**Response**:
- `201 Created`:
  ```json
  { "message": "Hotel created successfully", "hotel": { "id": 1, "name": "Grand Hotel", ... } }
  ```

#### POST `/rooms` (Admin Only)
Create a new room for a hotel.

**Headers**:
- `Authorization: Bearer <jwt_token>`

**Request**:
```json
{
  "hotelId": 1,
  "roomType": "double",
  "price": 100.00,
  "availability": true,
  "features": "king bed, sea view"
}
```

**Response**:
- `201 Created`:
  ```json
  { "message": "Room created successfully", "room": { "id": 1, "roomType": "double", ... } }
  ```

#### GET `/getAllHotels`
Retrieve all hotels with their rooms (public).

**Response**:
- `200 OK`:
  ```json
  [
    {
      "id": 1,
      "name": "Grand Hotel",
      "rooms": [{ "id": 1, "roomType": "double", ... }],
      ...
    }
  ]
  ```

### Booking Routes

#### POST `/bookings` (Authenticated)
Create a booking.

**Headers**:
- `Authorization: Bearer <jwt_token>`

**Request**:
```json
{
  "roomId": 1,
  "checkInDate": "2025-05-01",
  "checkOutDate": "2025-05-05",
  "totalPrice": 500.00,
  "bookingStatus": "confirmed"
}
```

**Response**:
- `201 Created`:
  ```json
  { "message": "Booking created successfully", "booking": { "id": 1, "roomId": 1, ... } }
  ```

#### GET `/bookings` (Authenticated)
Retrieve the authenticated user’s bookings.

**Headers**:
- `Authorization: Bearer <jwt_token>`

**Response**:
- `200 OK`:
  ```json
  [
    {
      "id": 1,
      "room": { "id": 1, "hotel": { "id": 1, "name": "Grand Hotel", ... }, ... },
      ...
    }
  ]
  ```

### Review Routes

#### POST `/reviews` (Authenticated)
Create a review for a hotel.

**Headers**:
- `Authorization: Bearer <jwt_token>`

**Request**:
```json
{
  "hotelId": 1,
  "rating": 5,
  "comment": "Great stay!"
}
```

**Response**:
- `201 Created`:
  ```json
  { "message": "Review created successfully", "review": { "id": 1, "rating": 5, ... } }
  ```

### Payment Routes

#### POST `/payments` (Authenticated)
Create a payment for a booking.

**Headers**:
- `Authorization: Bearer <jwt_token>`

**Request**:
```json
{
  "bookingId": 1,
  "amount": 500.00,
  "paymentMethod": "credit card",
  "paymentStatus": "completed"
}
```

**Response**:
- `201 Created`:
  ```json
  { "message": "Payment created successfully", "payment": { "id": 1, "amount": 500.00, ... } }
  ```

## Error Handling

The API returns standard HTTP status codes and JSON error messages:

- `400 Bad Request`: Invalid or missing input.
- `401 Unauthorized`: Missing or invalid JWT token.
- `403 Forbidden`: Insufficient permissions (e.g., non-admin accessing admin routes).
- `404 Not Found`: Resource (e.g., user, hotel) not found.
- `500 Internal Server Error`: Unexpected server error.

**Example Error**:
```json
{ "message": "Invalid email format" }
```

## Example Requests

Use **Postman**, **cURL**, or your frontend’s HTTP client (e.g., `axios`, `fetch`).

1. **Register a User**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"username":"JohnDoe","email":"john@example.com","password":"password123","preferences":"no smoking"}'
   ```

2. **Log In**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"email":"john@example.com","password":"password123"}'
   ```

3. **Get User by Email (Admin)**:
   ```bash
   curl -X GET "http://localhost:3000/api/auth/users/by-email?email=john@example.com" \
   -H "Authorization: Bearer <jwt_token>"
   ```

4. **Create a Booking**:
   ```bash
   curl -X POST http://localhost:3000/api/bookings \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer <jwt_token>" \
   -d '{"roomId":1,"checkInDate":"2025-05-01","checkOutDate":"2025-05-05","totalPrice":500,"bookingStatus":"confirmed"}'
   ```

## Security Notes

- **JWT Tokens**: Tokens expire after 1 hour. Implement token refresh or re-login on the frontend.
- **Sensitive Data**: `passwordHash` is excluded from responses. Avoid exposing sensitive fields.
- **Input Validation**: Basic validation is implemented. The frontend should also validate inputs before sending requests.
- **Rate Limiting**: Not implemented. Consider adding `express-rate-limit` for production.
- **HTTPS**: Use HTTPS in production to secure data in transit.
- **Admin Actions**: Admin endpoints (`/set-admin`, `/users/:id`, `/users/by-email`, `/hotels`, `/rooms`) are restricted to users with `role: admin`.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.
