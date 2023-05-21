minikube start

kubectl apply -f k8s/Common
kubectl apply -f k8s/BookService/postgres
kubectl apply -f k8s/BookService
kubectl apply -f k8s/AuthService/postgres
kubectl apply -f k8s/AuthService/redis
kubectl apply -f k8s/AuthService
kubectl apply -f k8s/UserService/postgres
kubectl apply -f k8s/UserService
kubectl apply -f k8s/EmailService
kubectl apply -f k8s/swagger

minikube addons enable ingress

minikube tunnel