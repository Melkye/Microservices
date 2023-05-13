# Book service

Exposes [http://localhost/books](http://localhost/books) endpoint

## How to run it locally in kubernetes

Install:
1. [Docker desktop](https://www.docker.com/products/docker-desktop/)
2. [kubectl](https://kubernetes.io/docs/tasks/tools/)
3. [minikube](https://minikube.sigs.k8s.io/docs/start/)

Working directory should be `Microservices\Bookservice`

```shell
minikube start
```

```shell
kubectl apply -f k8s/namespace.yaml
```
> Due to use of `bookshop` namespace all commands like `kubectl get pod` 
should be run with `-n bookshop` argument like `kubectl get pod -n bookshop`

```shell
kubectl apply -f k8s
```

```shell
kubectl apply -f k8s/postgres
```

```shell
minikube addons enable ingress
```

```shell
minikube addons enable ingress
```

```shell
minikube tunnel
```

Now you should be able to make calls on [http://localhost/books](http://localhost/books) endpoint

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
