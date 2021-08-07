FROM maven:3.6.3-jdk-11-slim
WORKDIR /app
COPY . /app
RUN mvn -v
RUN mvn clean install -DskipTests
EXPOSE 8088
ADD ./target/backend-0.0.1-SNAPSHOT.jar /developments/
ENTRYPOINT ["java","-jar","/developments/backend-0.0.1-SNAPSHOT.jar"]