# Book service

Exposes [http://localhost/books](http://localhost/books) endpoint

## How to run it locally in kubernetes

Install:
1. [Docker desktop](https://www.docker.com/products/docker-desktop/)
2. [kubectl](https://kubernetes.io/docs/tasks/tools/)
3. [minikube](https://minikube.sigs.k8s.io/docs/start/)

Navigate to Dockerfile folder:
```shell
cd BookService\BookService
```

```shell
minikube start
```

<details>
<summary>Only in case you want to build an image locally </summary> 
<br>

Change image and pull policy in `deployment.yaml` from
```
containers:
  - name: books-container
    image: melkye/books-image:1.0
    imagePullPolicy: IfNotPresent
```

to
```
containers:
  - name: books-container
    image: books-image:1.0
    imagePullPolicy: Never
```

And build an image
```shell
docker build -t books-image:1.0 .
```

```shell
minikube image load books-image:1.0
```

> Here may also use `eval $(minikube docker-env)` and then `docker build -t books-image:1.0 .` 
instead of creating an image outside of minikube and then loading it, but it did't work for me.

</details>

```shell
kubectl apply -f ../k8s/namespace.yaml
```
> Due to use of `bookshop` namespace all commands like `kubectl get pod` 
should be run with `-n bookshop` argument like `kubectl get pod -n bookshop`

```shell
kubectl apply -f ../k8s
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
