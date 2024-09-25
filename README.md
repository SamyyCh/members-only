# Members Only

Welcome to the Members Only application! This project is a simple web application designed for user registration and message management. It allows users to sign up, log in, and create messages visible to other members.

## Live Demo

You can try out the live version of the application [here](https://members-only-app-chzq.onrender.com/).

## Features

- **User Registration**: Create a new account to join the community.
- **User Authentication**: Log in to your account securely.
- **Create Messages**: Post messages that other members can view.
- **Admin Privileges**: Admin users can delete any message.

## Technologies Used

- **Node.js**: JavaScript runtime for building the application.
- **Express**: Web framework for Node.js.
- **PostgreSQL**: Relational database management system for storing user and message data.
- **EJS**: Templating engine for rendering HTML views.
- **Passport.js**: Authentication middleware for Node.js.
- **Bcrypt.js**: Library to hash passwords securely.
- **dotenv**: Module to manage environment variables.
- **Connect-flash**: Middleware for flash messages during authentication processes.

## Getting Started

To get a local copy of this project up and running, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/SamyyCh/members-only.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd members-only
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Set Up the Database**

   Ensure you have PostgreSQL installed and create a database. Update the database connection details in your environment variables.

5. **Run Database Seed Script**

   Populate the database with initial data:

   ```bash
   node db/populatedb.js
   ```

6. **Start the Application**

   ```bash
   npm start
   ```

   The application should now be running at `http://localhost:3000`.

## Environment Variables

Ensure you have the following environment variables set in your `.env` file:

- `DATABASE_URL`: Connection string for PostgreSQL.
- `ADMIN_USERNAME`: Username for the admin account.
- `SESSION_SECRET`: A secret key for session management.

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please open an issue or submit a pull request.

## Acknowledgments

This project is part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-nodejs-members-only). Special thanks to the contributors and community for their support.