# Book Management System Backend

This repository contains the backend of the Book Management System, a project developed as part of Tops Technologies training. It provides RESTful APIs for managing books and users.

## Features

- **User Authentication**: Secure user registration and login functionalities.
- **Book Management**: CRUD operations for books, including adding, updating, deleting, and retrieving book information.
- **User Management**: Manage user profiles and their associated data.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT**: JSON Web Tokens for authentication.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/23vk1/book_management_system.git

2. Navigate to the backend directory:

   ```bash
   cd book_management_system/backend

3. Install dependencies:

   ```bash
   npm install

4. Set up environment variables:

   Create a .env file in the backend directory and add the following:
   ```env
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret

5. Start the server:

   ```bash
    npm start
The backend server will run on http://localhost:3000.




## API Endpoints

### User Routes:
    POST /api/users/register --> Register a new user.
    POST /api/users/login --> Authenticate a user and return a token.
    GET /api/users/profile --> Retrieve the authenticated user's profile.

### Book Routes:
    POST /api/books --> Add a new book.
    GET /api/books --> Retrieve all books.
    GET /api/books/:id --> Retrieve a specific book by ID.
    PUT /api/books/:id --> Update a book by ID.
    DELETE /api/books/:id --> Delete a book by ID.


## Contributing
  Contributions are welcome! Please fork the repository and submit a pull request for any improvements.


### License
  This project is licensed under the MIT License. See the LICENSE file for details.

  ```pgsql
     
This README provides an overview of the backend functionalities, technologies used, setup instructions, and API endpoints. Ensure to replace placeholder values in the `.env` setup section with your actual configuration details.
::contentReference[oaicite:0]{index=0}
 














