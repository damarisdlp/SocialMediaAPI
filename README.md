# Social Media API Documentation

This documentation provides an overview of the endpoints available in the Social Media API.

## Table of Contents

- [Authentication Endpoints](#authentication-endpoints)
- [Friend Endpoints](#friend-endpoints)
- [Post Endpoints](#post-endpoints)
- [User Endpoints](#user-endpoints)
- [Running the API](#running-the-api)

## Authentication Endpoints

### Authenticate User

- **URL:** `/authenticate`
- **Method:** `POST`
- **Description:** Authenticate a user by checking their username and password. Returns a JWT token upon successful authentication. Take this token and plug it in under Bearer Token to create/delete posts, accept/send friend requests under a specific user. New token is needed per user.
- **Request Body:**
  - `username` (string, required): The username of the user.
  - `password` (string, required): The password of the user.
- **Response:**
  - `token` (string): JWT token for authenticated user.
- **Error Responses:**
  - `400 Bad Request`: If `username` or `password` is missing.
  - `401 Unauthorized`: If username or password is incorrect.

## Friend Endpoints

### Send Friend Request

- **URL:** `/friends/:username`
- **Method:** `POST`
- **Description:** Send a friend request to another user.
- **Authorization:** JWT token required.
- **Request Params:**
  - `username` (string, required): The username of the user to send a friend request to.
- **Response:**
  - `message` (string): "Friend request sent".
- **Error Responses:**
  - `404 Not Found`: If the target user doesn't exist.

### Accept Friend Request

- **URL:** `/friends/accept/:requestId`
- **Method:** `POST`
- **Description:** Accept a friend request from another user.
- **Authorization:** JWT token required.
- **Request Params:**
  - `requestId` (string, required): The ID of the user who sent the friend request.
- **Response:**
  - `message` (string): "Friend request accepted".
- **Error Responses:**
  - `404 Not Found`: If the friend request or user doesn't exist.

## Post Endpoints

### Create a New Post

- **URL:** `/posts`
- **Method:** `POST`
- **Description:** Create a new post.
- **Authorization:** JWT token required.
- **Request Body:**
  - `title` (string, required): The title of the post.
  - `description` (string, required): The description of the post.
- **Response:**
  - `id` (string): ID of the created post.
  - `title` (string): Title of the created post.
  - `description` (string): Description of the created post.
  - `createdAt` (date): Date and time of post creation.
- **Error Responses:**
  - `422 Unprocessable Entity`: If title or description is missing or invalid.

### Get All Posts by User

- **URL:** `/posts/:id`
- **Method:** `GET`
- **Description:** Get all posts by a specific user.
- **Authorization:** JWT token required.
- **Request Params:**
  - `username` (string, required): The username of the user.
- **Response:**
  - An array of post objects.
- **Error Responses:**
  - `404 Not Found`: If the user doesn't exist or has no posts.

### Delete a Post

- **URL:** `/posts/:id`
- **Method:** `DELETE`
- **Description:** Delete a post by its ID.
- **Authorization:** JWT token required.
- **Request Params:**
  - `id` (string, required): The ID of the post to be deleted.
- **Response:**
  - `message` (string): "Post deleted".
- **Error Responses:**
  - `404 Not Found`: If the post doesn't exist or is not owned by the authenticated user.

## User Endpoints

### Add a New User

- **URL:** `/user`
- **Method:** `POST`
- **Description:** Add a new user.
- **Request Body:**
  - `name` (string, required): The name of the user.
  - `email` (string, required): The email of the user.
  - `username` (string, required): The username of the user.
  - `password` (string, required): The password of the user.
- **Response:**
  - `message` (string): "Data added".
- **Error Responses:**
  - `409 Conflict`: If the username already exists in the database.

### Get User Information

- **URL:** `/user/:username`
- **Method:** `GET`
- **Description:** Get user information by username.
- **Request Params:**
  - `username` (string, required): The username of the user.
- **Response:**
  - User information object.
- **Error Responses:**
  - `404 Not Found`: If the user doesn't exist.

### Update User Information

- **URL:** `/user/:username`
- **Method:** `PUT`
- **Description:** Update user information by username.
- **Authorization:** JWT token required.
- **Request Params:**
  - `username` (string, required): The username of the user.
- **Request Body:**
  - `name` (string, required): The new name of the user.
  - `email` (string, required): The new email of the user.
  - `password` (string, required): The new password of the user.
- **Response:**
  - Updated user information object.
- **Error Responses:**
  - `404 Not Found`: If the user doesn't exist.

### Delete User

- **URL:** `/user/:username`
- **Method:** `DELETE`
- **Description:** Delete a user by username.
- **Authorization:** JWT token required.
- **Request Params:**
  - `username` (string, required): The username of the user.
- **Response:**
  - `message` (string): "Document deleted successfully".
- **Error Responses:**
  - `404 Not Found`: If the user doesn't exist.

## Running the API

Follow these steps to run the Social Media API locally:

1. Clone the repository:
git clone <repository-url>

2. Install dependencies:
cd <project-folder>
npm install

3. Set up environment variables:
Replace the contents of the `.env` file in the root directory with a secret key for JWT token encryption and `<your-database-url>` with your MongoDB database URL.:
JWT_SECRET=<your-jwt-secret>
DATABASE_URL=<your-database-url>

4. Start the Server
node server.js

5. The API will be accessible at `http://localhost:3000`.
