# User's CRUD API & Chat Socket

## Installation

To install the dependencies and devDependencies and start the server.

```sh
npm run start
```

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
DB_PASSWORD=<DB_PASSWORD> (Default - 12345)
DB_NAME=<DB_NAME> (Default - postgres)
HOST=<HOST_NAME> (Default - localhost)
DB_PORT=<DB_PORT> (Default - 5432)
DIALECT=<DB_DIALECT> (Default - postgres)

```
