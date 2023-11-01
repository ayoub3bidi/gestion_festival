# Gestion de festival
Un mini projet pour la matière mini projet: python avancé (Mastère Professionnel en Ingénierie du Logiciel - Open Source à l'ISI).
## Architecture de la base de données
![architecture](./assets/database_architecture.png)

### Project architecture
```
├── src
│ └── assets
│ └── constants
│ └── controllers
│     ├── admin
│     ├── user
│ └── database
│     ├── postgres_db.py
│     ├── redis_db.py
│ └── integration_tests
│ └── middleware
│     ├── auth_guard.py
│ └── migrations
│ └── models
│ └── routes
│     ├── admin
│     ├── user
│ └── schemas
│ └── unit_tests
│ └── utils
│ └── app.py
│ └── main.py
│ └── restful_ressources.py
```
## Setup
### Environment variables

```shell
cp .env.dist .env
```
This will create a `.env` file in your project locally.
```
APP_TITLE = "Mercury API Docs"
APP_DESCRIPTION = "This is the Swagger documentation of the Mercury API"
APP_VERSION = 1.0
API_VERSION = "v1"
APP_ENV=local
## Admin Configuration
ADMIN_USERNAME = "admin"
ADMIN_EMAIL = "admin"
ADMIN_PASSWORD = "admin"
## Postgres Configuration
POSTGRES_HOST_AUTH_METHOD = changeit
POSTGRES_PASSWORD = mercury
POSTGRES_HOST = mercury_db
POSTGRES_PORT = 5432
POSTGRES_USER = mercury
POSTGRES_DB = mercury
POSTGRES_HOST_AUTH_METHOD = trust
## Redis Configuration
REDIS_HOST = mercury_cache
REDIS_PORT = 6379
## JWT Configuration
JWT_SECRET_KEY = "mysecretkey"
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
```

### Run the containers
```shell
docker-compose up --build --force-recreate
```
## Test the database

```shell
$ docker exec -it mercury_db psql -U mercury mercury
psql (13.9 (Debian 13.9-1.pgdg110+1))
Type "help" for help.
```

## Test the API

You can check the Swagger documentation on http://localhost:8000.

```shell
$ curl localhost:8000/v1/health
{"alive":true,"ip":"172.21.0.1","status":"ok"}
```
