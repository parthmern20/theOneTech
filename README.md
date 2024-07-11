# Admin Authentication & Authorization API + User CRUD API

## Prerequisite
 - Use node v20.15.0 or Latest Version of node

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up the your database URL in the `.env` file
4. Run Prisma migrations: `npx prisma migrate dev` & `npx prisma generate`
5. Start the server: `npm start`

## Additional Notes

- If encountering issues with Database connectivity, open terminal 
    ```
    RUN 
    npm install
    npx prisma generate
    npx prisma db push
    npm start
    ```

## Technologies Used
    Node.js
    Express.js
    Prisma
    Joi
    JWT
    MySQL Local
    Bcryptjs
    Morgan

## Implemented Features
- Implemented CRUD operations 
- Implemented validation for incoming requests
- Implemented authentication and authorization using JWT
- Implemented pagination, sorting, and filtering for fetching resources.


## Endpoints

### Admin Authentication

- **Register:** `POST /api/admin/register`
  - Request Body: `{ "email": "aditya@mail.com", "password": "abc@1234" }`
- **Login:** `POST /api/admin/login`
  - Request Body: `{ "email": "swapnil@mail.com", "password": "12345678" }`

### User CRUD  --> Admin can only perform this CRUD Operation so Admin Token is required.

- **Create User:** `POST /api/user/create`
  - Request Body: `{"name": "Johncena","address": "87 Main LA","age": 70,"mobile": "1234567890","email": "johncena45@example.com"}`
  - Requires JWT token 
- **Update User:** `POST /api/user/update/3`
  - Request Body: `{"name": "Update User","address": "87 Main LA","age": 70,"mobile": "1234567890","email": "updated@example.com"}`
  - Requires JWT token 
- **Get All User:** `GET /api/user/`
  - Requires JWT token
- **Get User By Id:** `GET /api/user/3`
  - Requires JWT token
- **Delete User:** `GET /api/user/delete/3`
  - Requires JWT token






