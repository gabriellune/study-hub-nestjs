# 📚 study-hub 🚀

Service responsible for the administration of users, courses and their tasks in NestJs.

## Repository Technologies 👨‍💻 

- NPM
- NestJS
- Swagger
- MySQL
- Sequelize
- RabbitMQ

## Installation 👩‍💻

To install the project's dependencies, just run the command below:

```bash
$ npm install
```
## Before running the project locally...

Download e install MySQL locally in the following link:

https://dev.mysql.com/downloads/mysql/

After installing, add your setting data in the '.env' file on:

- DB_HOST
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
- DB_DATABASE

## Continuing in the .env file...

You need to add values on: 

- JWT_KEY 
- EMAIL_HOST (smtp of your email provider)
- EMAIL_USER (the email that will be used to send the emails)
- EMAIL_PASS (the email password)
- PUB_QUEUE (rabbitmq queue name)

## Running the project locally 🏠

To run the project:

```bash
$ npm run start
```

## To access API documentation 📖

With the project running, open the following link in your browser:

http://localhost:3000/documentation/

## For everything to go right...

Just create your main admin user in 'api/users/main-admin/' and get the access token with 'api/auth/login'.
Now you can create another users, courses and tasks.
Dont forget to use 'Authorization' header with the token to use the API's.