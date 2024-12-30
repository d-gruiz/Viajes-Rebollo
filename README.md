# Viajes-Rebollo
ASI project

# Dependencies
openjdk 21.0.4
Apache Maven 3.8.7
node 22.7.0
npm 10.8.2

# How to run

In this order

## Database
En el directorio principal
```bash
docker compose up
```
## Frontend
En el directorio frontend
```bash
cd frontend
npm install vite
npm install
npm run dev
```
## Backend
En el directorio Viajes-rebollo
```bash
cd viajes-rebollo
mvn clean install
mvn spring-boot:run
```
