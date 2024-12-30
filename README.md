# **Blog Management API**

The Blog Management API powers a dynamic platform built with Node.js, TypeScript, Express, and MongoDB. This API enables seamless blog creation, editing, and management, allowing users to post, update, and delete content. With a focus on scalability and performance, it supports user authentication and role-based access control (RBAC) using JWT. The RESTful API design ensures efficient communication between the frontend and backend, providing a smooth and secure user experience for managing blog posts and user interactions.

## **Live Demo**

[Live Link](https://blog-mangement-api.vercel.app/)

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

# Project Overview:

The **Blog Management API** is a powerful backend system designed to manage blog posts and user interactions in a scalable and secure manner. Built with **Node.js**, **TypeScript**, **Express**, and **MongoDB**, this API offers a robust solution for handling various blogging features, including:

- **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens), ensuring safe access to the platform.
- **Blog Post Management**: Allowing users to create, update, view, and delete blog posts with rich text content.
- **Role-based Access Control (RBAC)**: Differentiating user roles (e.g., Admin, User) to ensure that only authorized users can perform specific actions like content moderation or administrative tasks.
- **RESTful API Design**: Using RESTful principles, the API ensures smooth communication between the frontend and backend, allowing for easy integration with any user interface or third-party services.
- **MongoDB for Data Storage**: A flexible NoSQL database to store blog posts, user data, and comments in a structured format, supporting efficient querying and scalability.

The **Blog Management API** aims to deliver a seamless blogging experience with secure access control, content management, and smooth interactions, while ensuring performance and reliability as the platform scales.

## Features

- **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens) for safe and authorized access.
- **Blog Post Management**: Create, update, view, and delete blog posts with support for rich text content.
- **Role-Based Access Control (RBAC)**: Differentiate user roles (e.g., Admin, User) to manage content and restrict specific actions based on roles.
- **RESTful API Endpoints**: Easy-to-use RESTful endpoints for seamless interaction with the frontend and third-party services.
- **MongoDB Integration**: Flexible and scalable data storage with MongoDB to handle blog posts, user data, and comments.
- **CRUD Operations**: Full support for CRUD operations (Create, Read, Update, Delete) on blog posts and user management.
- **Comment System**: Allow users to comment on blog posts, creating engagement and interaction on content.
- **Timestamps**: Automatic tracking of blog post creation and modification times using MongoDB's `timestamps` feature.
- **Input Validation**: Ensure valid data through server-side validation (e.g., content length, email format) using libraries like Zod or Mongoose validation.
- **Search Functionality**: Easily search for blog posts based on title, content, or tags.
- **Pagination**: Efficient pagination for listing blog posts, improving performance and user experience.
- **Error Handling**: Robust error handling with detailed messages for invalid requests, authentication errors, and server issues.

These features ensure a smooth and secure user experience while managing blog posts, user authentication, and interactions.

## Technology Stack

- **Backend**: API routes, Node, Express, Mongodb, mongoose, custom Axios instance for API handling
- **Authentication**: JWT stored in cookies for secure, persistent user sessions
- **Programming Language:** Javascript
- **Web Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Sumon-DevCoder/blog-management-api.git
   ```

2. **Navigate into the project directory**:

   ```bash
   cd blog-management-api
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create a `.env.local` file in the root directory and add your environment variables**:

   ```bash
   # .env crediential (REDACTED)
   DB_URL=mongodb+srv://<username>:<password>@cluster0.0i0xa.mongodb.net/megaMartDB?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   BCRYPT_SALT_ROUND=12
   NODE_ENV='development'

   # admin credentials (REDACTED)
   admin_email=sumon.devcoder@gmail.com
   admin_password=sumon-Dev24%
   admin_mobile_number=+8801962-878499

   # jwt credentials (REDACTED)
   JWT_ACCESS_SECRET=secret
   JWT_ACCESS_EXPIRES_IN=365d
   JWT_REFRESH_SECRET=refreshscret
   JWT_REFRESH_EXPIRES_IN=365d
   ```

# Usage

```
npm run dev
```

# License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code for personal, educational, or commercial purposes, subject to the terms of the license. See the LICENSE file for more details.
