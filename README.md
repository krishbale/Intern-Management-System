# INtern-Management-System
# Intern Application Management API

This REST API provides functionalities for managing intern applications and allows companies to create job listings. It includes user registration, login, and authentication.

## Features

- User registration: Companies can register as users to access the API's functionalities.
- User login: Registered users can log in to access internship/job opening  routes.
- Authentication: Authentication is implemented using JSON Web Tokens (JWT) to secure the API endpoints.
- Create job listings: Companies can create job listings with details such as job title, description, skills required, deadline, and salary.
- View job listings: Companies can view their own job listings. with pagination and filter and sorting functionality 
- Manage intern applications: Companies can retrieve, filter, and sort intern applications based on criteria such as qualifications, application status, and date of submission.

## Prerequisites

Before running the API, make sure you have the following installed:

- Node.js
- MongoDB

## Getting Started

1. Clone the repository:
2. https://github.com/krishbale/INtern-Management-System
3. 
2. Install dependencies:

d intern-application-api
npm install

## API Endpoints

### Authentication

- `POST /company/register` - Register a new user (company).
- `POST /company/login` - Log in a user and receive an access token.
-  `POST /applicant/register` - Register a new user (company).
- `POST /applicant/login` - Log in a user and receive an access token.

### Job Listings

- `GET /company/viewjob` - Create a new job listing.
- Make sure to use environment variable for your database in my case
MONGODB_URL = mongodb+srv://intern:management@cluster0.wzn2rps.mongodb.net/?retryWrites=true&w=majority
PORT = 5000
SECRECT_KEY=MYNAMEISBALKRISHNAPOKHARELILIVEI



