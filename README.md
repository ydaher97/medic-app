# medic-app
# Quiz Website

## Features

### Sign up

New users can create an account by providing their username, email, and password. The password is hashed before storing it in the database for enhanced security.

![image](https://github.com/ydaher97/medic-app/assets/73422885/42002952-26cc-4383-98b7-0e59bf07f57d)


### Log in

Existing users can log in using their username and password. The password is verified by comparing the hashed password stored in the database with the hashed version of the provided password.
![image](https://github.com/ydaher97/medic-app/assets/73422885/77d0cc1c-c580-4208-8167-290c8a820402)


### Posts 
Users can share their thoughts on various topics 

![image](https://github.com/ydaher97/medic-app/assets/73422885/77d0cc1c-c580-4208-8167-290c8a820402)


### Quizzes

Users can access quizzes on various topics and answer multiple-choice questions.
![image](https://github.com/ydaher97/medic-app/assets/73422885/cd262fe5-7991-4177-8eb2-98a9568bf132)

![image](https://github.com/ydaher97/medic-app/assets/73422885/b3c8f7c3-0b1d-4247-b247-e75f6294621c)



### Progress Tracking

The system tracks the progress of each user, storing the results of their quiz attempts.

### Profiles

Users can view their profiles, which display their personal information and quiz scores.
![image](https://github.com/ydaher97/medic-app/assets/73422885/c5f5661a-04e9-4489-91dc-346e5f3f28e3)


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


