# medic-app
# Quiz Website

## Features

### Sign up

New users can create an account by providing their username, email, and password. The password is hashed before storing it in the database for enhanced security.

![image](https://github.com/ydaher97/medic-app/assets/73422885/77d0cc1c-c580-4208-8167-290c8a820402)


### Log in

Existing users can log in using their username and password. The password is verified by comparing the hashed password stored in the database with the hashed version of the provided password.


### Posts 
Users can share their thoughts on various topics 

### Quizzes

Users can access quizzes on various topics and answer multiple-choice questions.

### Progress Tracking

The system tracks the progress of each user, storing the results of their quiz attempts.

### Profiles

Users can view their profiles, which display their personal information and quiz scores.

## Technologies Used

- Frontend: HTML, CSS, typeScript, Angular
- Backend: Node.js, Express.js
- Database: MySQL
- Security: JWT (JSON Web Tokens) for authentication and password hashing for enhanced security.


## Setup Instructions

1. Clone the repository: `git clone <repository_url>`
2. Install the dependencies: `npm install`
3. Configure the database connection:
   - Create a MySQL database.
   - Update the database configuration in `config/database.js`.
4. Start the server: `npm start`
5. Access the website in your browser: `http://localhost:3000`


