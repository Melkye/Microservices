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
minikube start
```

```shell
kubectl apply -f k8s/Common
```
> Due to use of `bookshop` namespace all commands like `kubectl get pod` 
should be run with `-n bookshop` argument like `kubectl get pod -n bookshop`


```shell
kubectl apply -f k8s/BookService/postgres
kubectl apply -f k8s/BookService
```

```shell
kubectl apply -f k8s/AuthService/redis
kubectl apply -f k8s/AuthService/postgres
kubectl apply -f k8s/AuthService
```

```shell
minikube addons enable ingress
```

```shell
minikube tunnel
```

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