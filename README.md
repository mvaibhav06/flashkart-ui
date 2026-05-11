# Flashkart Inventory Ledger

A full-stack enterprise e-commerce ledger designed to demonstrate concurrency management, transactional integrity, and full-stack integration. 

## Architecture & Tech Stack
* **Backend:** Java 17, Spring Boot 3, Spring Data JPA, Hibernate
* **Database:** MySQL 8 (with Pessimistic Write Locking)
* **Frontend:** React 18, TypeScript, Vite, Axios
* **Key Patterns:** MVC, Domain-Driven Design (DDD), RESTful APIs

## How to Run Locally

### 1. Database Setup
Ensure MySQL is running locally. Create an empty database named `flashkart`.
`CREATE DATABASE flashkart;`
Update the `src/main/resources/application.yml` with your local MySQL credentials.

### 2. Run the Backend
The Spring Boot application uses `ddl-auto: update` to generate the schema and a `CommandLineRunner` to automatically seed the database with test products upon startup.
`./mvnw spring-boot:run`

### 3. Run the Frontend
Navigate to the frontend directory:
`npm install`
`npm run dev`
Open `http://localhost:5173` in your browser.
