# UserAuth

This repository contains a demo API built with NodeJS.
The API is used to manage user authentication and authorization in a MongoDB database.

### Development

This application was developed using [ExpressJS](http://expressjs.com/). MongoDB was used for persisting data with [Mongoose](https://mongoosejs.com/) as [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping). [Mongo Atlas](https://mongodb.com) was used as the cloud database. You can sign up and create a cluster for free.

### Installation

- Start up your terminal (or Command Prompt on Windows OS).
- Ensure that you've `node` installed on your PC.
- Clone the repository by entering the command `git clone https://github.com/petrepan/UserAuth` in the terminal.
- Navigate to the project folder using `cd UserAuth` on your terminal (or command prompt)
- After cloning, install the application's dependencies with the command `npm install`.
- Create a `.env` file in your root directory as described in `.env.sample` file. Variables such as MONGO_URI (which must be a mongoDB URL), JWT_SECRET (any value which serves as the JWT secret) and PORT are defined in the .env file and it is essential you create this file before running the application.

```
PORT=3000
MONGO_URI=mongodb+srv://username:<password>@cluster0.4clld.mongodb.net/databaseName?retryWrites=true&w=majority
JWT_SECRET = 'random words'
```

- After this, you can then start the server with the command: `npm run dev`.

### API Documentation

The API has three endpoint which is the `/api/users/register`, `/api/users/login`, `/api/users/allusers` endpoint which works with the HTTP verbs: `POST`, `POST`, `GET` respectively.

#### POST HTTP Request

- `POST` /api/users/register
- PAYLOAD:

```x-form-url-encoded
firstName: John
surName: Doe
email: john.doe@gmail.com
occupation: student
password: johndoe
```

#### HTTP Response

- HTTP Status: `201: created`
- JSON data

```json
{
  "status": "success",
  "data": {
    "_id": "59071791b0lkscm2325794",
    "firstName": "John",
    "surName": "Doe",
    "email": "john.doe@gmail.com",
    "occupation": "student",
    "password": "johndoe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTEzMDI5NGFkZWZlMjA",
    "__v": 0
  }
}
```

#### POST HTTP Request

- `POST` /api/users/login
- PAYLOAD:

```x-form-url-encoded
email: john.doe@gmail.com
password: johndoe
```

#### HTTP Response

- HTTP Status: `201: created`
- JSON data

```json
{
  "status": "success",
  "data": {
    "_id": "59071791b0lkscm2325794",
    "firstName": "John",
    "surName": "Doe",
    "email": "john.doe@gmail.com",
    "occupation": "student",
    "password": "johndoe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTEzMDI5NGFkZWZlMjA",
    "__v": 0
  }
}
```

#### GET HTTP Response

- `GET` /api/users/allusers
Before getting the list of all users, you need to ensure that a user is logged in. It accepts a header that contains an `authorization` key.

##### HEADER
```
    Accept: application/json
    authorization: Bearer {TOKEN}
```

```json
{
  "status": "success",
  "data": [
    {
      "_id": "59071791b0lkscm2325794",
      "firstName": "John",
      "surName": "Doe",
      "email": "john.doe@gmail.com",
      "occupation": "student",
      "__v": 0
    }
  ]
}
```

### Author

**Peter Awotola**
