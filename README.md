# Social Network API

This project is a social network API built with Node.js, Express, and MongoDB. It allows users to share thoughts, react to thoughts, and add friends. Use Insomnia or Postman to test API routes.

## Installation
```
npm install
```

## Seeding
```
npm run seed
```

## Usage
```
npm start
// or do dev:
npm run dev
```

## Routes
- GET /api/users
- POST /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id
- POST /api/users/:userId/friends/:friendId
- DELETE /api/users/:userId/friends/:friendId
- GET /api/thoughts
- POST /api/thoughts
- GET /api/thoughts/:id
- PUT /api/thoughts/:id
- DELETE /api/thoughts/:id
- POST /api/thoughts/:thoughtId/reactions
- DELETE /api/thoughts/:thoughtId/reactions


###### This README was generated by an LLM and edited by a human.