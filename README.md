# Bookify (BETA)

Bookify is a hobby project built using **Express.js**, **EJS**, and **MongoDB**. This app serves as a simple book management system built by **Keith Poncardas**.

## Features
- Express.js for backend handling
- EJS for templating
- MongoDB for database management
- Authentication with JWT
- Basic CRUD operations

## Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Keith-Poncardas/bookify.git
   cd bookify
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

## Environment Variables
Create a `.env` file in the root directory and add the following:

```
MONGO_URL=your_mongodb_connection_string
PORT=your_preferred_port

JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=your_jwt_expiration_time

USN=your_dashboard_username
PASS=your_dashboard_password
```

## Database Seeding
Seed your database by running:
```sh
node seeders/seeds.js
```

## Running the App
Start the development server:
```sh
node server.js
```

## License
This project is for personal use and learning purposes only.

