# User's CRUD API & Chat Socket
[API Documentation](https://docs.google.com/document/d/e/2PACX-1vR50WLZ48U1EuwBN-6Y2cYg5nJ_1V7KDArP0LjggnFIj9ndNH3qFHyEghNf-rZf_yNHPc_5NUk3x6gA/pub)

[Postman Collection](https://solar-flare-640205-1.postman.co/workspace/0cfd07e2-45bf-4df6-84bd-2290b59afafc/collection/26434686-2b7c2eaf-abaf-452c-9b08-149d9df5947b?action=share&creator=26434686)

## Installation

To install and run the dependencies and devDependencies and start the server.

```sh
cd './NESTJS/
npm i 
npm run start
```

The above command will run all the dependencies for Server and client side and create image in docker and initiate it for use.
No any other command is required for executing the project.

Environment variables for Client Side

```sh
REACT_APP_API_BASE_URL=<YOUR_SERVER_URL>, (DEFAULT - http://localhost:3001)
```

Environment variables for Server Side

```sh
PORT=<SERVER_PORT> (Default -3001)
SECRET=<JWT_AUTH_TOKEN_SECRET> (Default - Secret)
EXPIRES_IN=<JWT_EXPIRATION> (Defautl - 1d)
CACHE_TTL=<CACHE_TIMELIMIT> (Default - 100)
DB_USERNAME=<DB_USERNAME> (Default - postgres)
DB_PASSWORD=<DB_PASSWORD> (Default - postgres)
DB_NAME=<DB_NAME> (Default - postgres)
HOST=<HOST_NAME> (Default - localhost)
DB_PORT=<DB_PORT> (Default - 5432)
DIALECT=<DB_DIALECT> (Default - postgres)
PG_ADMIN_EMAIL=<Email_TO_LOGIN_ON_PG_Admin> (Default - admin@email.com)
PG_ADMIN_PASSWORD=<PG_ADMIN_LOGIN_PASSWORD> (Default - admin)
PF_ADMIN_PORT=<PG_ADMIN_PORT> (Default - 5050)

```
