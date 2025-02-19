# Project Setup Guide

## Frontend

1. Install dependencies:
    ```bash
    npm install
    ```
2. Create a `.env` file with the following content:
    ```env
    NEXT_PUBLIC_API_URL="backend running address"
    ```

## Database

1. Navigate to the `db` folder and run the following command for local database setup:
    ```bash
    docker-compose up
    ```
2. Alternatively, you can use a cloud database URL and paste it in the `.env` file of the backend.

## Backend

1. Install dependencies:
    ```bash
    npm install
    ```
2. Create a `.env` file with the following content:
    ```env
    DATABASE_URL="local db url is in docker-compose.yaml or cloud db url"
    JWT_SECRET="somesecret"
    PORT=8000 # or any port of your choice (8080 is not free if using local db)
    ```

Follow these steps to set up and run the frontend, backend, and database services for the project.