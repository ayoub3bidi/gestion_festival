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

### Run the containers
```shell
docker-compose up --build --force-recreate
```
## Test the database

```shell
$ docker exec -it festival_db psql -U festival festival
psql (13.9 (Debian 13.9-1.pgdg110+1))
Type "help" for help.
```

## Test the API

You can check the Swagger documentation on http://localhost:8000.

```shell
$ curl localhost:8000/v1/health
{"alive":true,"ip":"172.21.0.1","status":"ok"}
```
