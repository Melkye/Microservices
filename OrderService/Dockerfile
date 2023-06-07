FROM openjdk:17-jdk-slim

EXPOSE 3001

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} /order-service.jar

ENTRYPOINT ["java","-jar","/order-service.jar"]
