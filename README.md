
# Palindrome Check App

  

This is a full-stack application that allows users to input text and checks whether it's a palindrome. It saves each input in a database, displays a history of the last 20 entries, and allows clearing the history.

  

## Tech Stack

  

-  **Frontend:** React, TypeScript, Vite

-  **Backend:** Express.js, TypeScript, MariaDB

-  **Database:** MariaDB (local)

-  **Bonus:** Persistent storage + sorted history

  

---

  

## How to Run Locally

  

### 1. Clone the repo

  

git clone https://github.com/your-username/Palindrome-Check.git

cd Palindrome-Check

  

### 2. Backend Setup

  
cd backend

npm install

cp .env.example .env

#### Update the .env file with your local DB credentials

  

#### Ensure you have a local MariaDB instance and create the following database and table:

CREATE DATABASE palindromecheck_app;

USE palindromecheck_app;  

CREATE TABLE palindrome_checks (

id INT AUTO_INCREMENT PRIMARY KEY,

input_text VARCHAR(255) NOT NULL,

is_palindrome BOOLEAN NOT NULL,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

  

#### Then start the server:

npm run dev

  

### 2. Frontend Setup

cd frontend

npm install

npm run dev

  

#### Open http://localhost:5173 to use the app.

  

## Features

Checks if input is a palindrome (case-insensitive, ignores symbols)

Stores all inputs in a local DB

Displays the last 20 inputs (most recent first)

Allows clearing input history

  

### OBS: I've ran out of time so couldn't implement the tests.
