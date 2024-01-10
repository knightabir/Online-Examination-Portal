# 🌐 Online Examination Portal

Welcome to the **Online Examination Portal**! This project provides an interactive platform for conducting online exams, built with Spring Boot for the backend, Angular for the frontend, and MySQL as the database.

## 🚀 Features

### Admin User:

- ✨ Add, update, and delete quizzes, categories, and questions.

### Normal User:

- 📝 Create an account.
- 🎓 Take quizzes based on personal preferences.

**Note:** In the initial stage, evaluation is done on the frontend side. Future plans include making this a backend service for calculating and saving user marks.

## 🌐 Live Website

Explore the live website: [Online Examination Portal](http://13.53.59.47/)

## 🔧 Local Setup

Follow these steps to set up the project locally after cloning the repository:

### Backend (Spring Boot):

1. Open `examserver/src/main/resources/application.properties`.
2. Update the MySQL server details:

   ```properties
   spring.datasource.url=jdbc:mysql://[your-sql-server-url]:[your-sql-server-port]/[your-sql-database-name]
   spring.datasource.username=[your-username]
   spring.datasource.password=[your-password]
### Frontend (Angular):

1. Open `exam_frontend/src/environments/environment.ts`.

   ```typescript
   export const environment = {
     production: false,
     baseUrl: 'http://localhost:8080',
   };
2. Navigate to the frontend directory
    ```
    cd exam_frontend
3. Install dependencies
   ```
   npm install
4. Run the Angular application
   ```
   ng serve
5. Access the application in your browser at http://localhost:4200.




Feel free to copy and paste this code into your README.md file on GitHub. Adjustments can be made as needed for your specific project details.
