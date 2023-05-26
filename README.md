# Microservices

## App is a simple bookshop

It exposes 3 endpoints:

[http://localhost/books](http://localhost/books)

[http://localhost/auth](http://localhost/auth)

[http://localhost/orders](http://localhost/orders)
## How to run it locally in kubernetes

Install:
1. [Docker desktop](https://www.docker.com/products/docker-desktop/)
2. [kubectl](https://kubernetes.io/docs/tasks/tools/)
3. [minikube](https://minikube.sigs.k8s.io/docs/start/)

Working directory should be `Microservices\`


```shell
./start.sh
```

> Due to use of `bookshop` namespace all commands like `kubectl get pod` 
should be run with `-n bookshop` argument like `kubectl get pod -n bookshop`

<details> <summary> /books endpoint </summary>


| Method  | Endpoint	 |
|---------|--------------|
| GET     | /books		 |
| GET     | /books/\{id} |
| POST    | /books       |
| PUT     | /books/\{id} |
| DELETE  | /books/\{id} |

#### POST/PUT model
```
{
  "title": "string",
  "description": "string",
  "author": "string"
}
```
</details>

<details> <summary> /auth endpoint </summary>


| Method  | Endpoint	       | Description                        |
|---------|------------------|------------------------------------|
| POST    | /auth/sign-up    |       -                            |
| POST    | /auth/sign-in    |       -                            |
| GET     | /auth/logout     |       -                            |
| GET     | /auth/refresh    | refresh tokens                     | 
| POST    | /auth/validate   | validate token                     | 

#### Authorization header model
```
Bearer {token}
```

#### sign-up model
```
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "age": "number"
}
```

#### sign-in model
```
{
  "email": "string",
  "password": "string"
}
```

#### validate token model
```
{
  "token": "string"
}
```
</details>

<details> <summary> /user endpoint </summary>


| Method  | Endpoint	       | Description                        |
|---------|------------------|------------------------------------|
| GET     | /user/\{id}      | get user by id                     |
| GET     | /user/all        | get all users                      |
| POST    | /user            | create user (prefer using sign-up) |
| PATCH   | /user/\{id}      | update user by id                  |
| DELETE  | /user/\{id}      | delete user by id                  |

#### Authorization header model
```
Bearer {token}
```
</details>