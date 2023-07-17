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
- EMAIL_HOST (smtp of your email provider, dont forget to able on your provider)
- EMAIL_USER (the email that will be used to send the emails)
- EMAIL_PASS (the email password)
- PUB_QUEUE (rabbitmq queue name)

## Running the project locally 🏠

To run the project:

```bash
$ npm run start
```

About RabbitMQ:
You have to up the 'docker-composer.yaml' file in the background but change in lines 8 and 9 for your RabbitMQ login and password

## To access SWAGGER API documentation 📖

With the project running, open the following link in your browser:

http://localhost:3000/documentation/

## For everything to go right...

Just create your main admin user in 'api/users/main-admin/' and get the access token with 'api/auth/login'.
Now you can create another users, courses and tasks.
Dont forget to use 'Authorization' header with the token to use the API's.

## A last comment ...

The thought flow was: first a main administrator user was registered and after authenticating (login), other users could be created, being students or admins. Creating new courses would also be possible, even before students, but only after creating new courses tasks could be registered.