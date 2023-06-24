# Moviemagic

Welcome to the Movie App! This application allows users to manage and browse movies, as well as save their favorite movies.

## Features

- User authentication: Sign up and login functionality for multiple users.
- Movie management: Create, update, and delete movies.
- Movie browsing: Get a list of all movies or view details of a specific movie.
- Favorite movies: Add movies to your favorites list.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- Multer (for file uploading)
- Bcrypt (for password hashing)

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB Atlas account (for connecting to your MongoDB database)
- Clone the repository: `git clone https://github.com/your-username/movie-app.git`
- Install dependencies: `npm install`

### Configuration

1. Create a `.env` file in the project root directory.
2. Add the following environment variables to the `.env` file:

   ```plaintext
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=3000


### Running the Application

1. Start the server: `npm start`
2. The application will be accessible at `http://localhost:  3000`.

## API Endpoints

- **POST /api/auth/signup**: Register a new user. Requires a JSON body with username, password, email, and optional image fields.
- **POST /api/auth/login**:  Log in as an existing user. Requires a JSON body with username and password fields.
- **POST /api/movies**: Create a new movie. Requires a JSON body with movie_name, genre, director, rating, and year_of_release fields. Requires a valid JWT token for authentication.
- **GET /api/movies**: Get a list of all movies. Requires a valid JWT token for authentication.
- **GET /api/movies/:id**: Get details of a specific movie by ID. Requires a valid JWT token for authentication.
- **PATCH /api/movies/:id**: Update details of a specific movie by ID. Requires a JSON body with any of the following fields: `movie_name`, `genre`, `director`, `rating`, `year_of_release`. Requires a valid JWT token for authentication.
- **DELETE /api/movies/:id**: Delete a specific movie by ID. Requires a valid JWT token for authentication.
- **POST /api/favorites**: Add a movie to the user's favorites list. Requires a JSON body with `movieId` field. Requires a valid JWT token for authentication.
- **GET /api/favorites**: Get the user's favorite movies. Requires a valid JWT token for authentication.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

Please note that you should replace `<your-mongodb-uri>` and `<your-jwt-secret>` placeholders with your own MongoDB Atlas connection string and JWT secret key respectively. Additionally, make sure to update the API endpoints and their descriptions according to your application's implementation.


