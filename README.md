# PokemonGoApp Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Installations and Setup](#installations-and-setup)
4. [Overview](#overview)
5. [Endpoints](#endpoints)
   - [Error Handler](#error-handler)
   - [CRUD Operations](#crud-operations)
   - [List](#list)
6. [Request Body Validation](#request-body-validation)
7. [Additional Information](#additional-information)
8. [Conclusion](#conclusion)

## Introduction
Welcome to the official documentation of **PokemonGoApp**. This documentation provides an in-depth overview of our application's features, technologies, and endpoints. It is designed to help you understand how our application works and how to interact with it effectively.

## Technologies Used
**PokemonGoApp** leverages a stack of cutting-edge technologies to deliver a robust and efficient experience:

- **Docker:** Containerization for seamless deployment.
- **Sequelize:** Object-Relational Mapping for PostgreSQL database interactions.
- **PostgreSQL:** The backend database management system.
- **Sinon:** Unit testing for robust code quality.
- **ESLint:** Code quality and consistency maintenance.

## Installations and Setup
Before you can start using **PokemonGoApp**, you need to set up your development environment. Follow these steps to get started:

### 1. Clone the Repository
bash
git clone git@github.com:Mujahedyousef/PokemonGoApp.git


### 2. Install Dependencies
Navigate to the project directory and install the required dependencies.

bash
cd PokemonGoApp
npm install


### 3. Configure Database
Set up the PostgreSQL database and update the database configuration in the project.

### 4. Unit Testing
Ensure you have Sinon installed for unit testing. Run the unit tests to ensure code quality.

bash
npm test


### 5. Start the Application
Start the **PokemonGoApp** using Docker for easy deployment.

bash
docker-compose up


## Overview
**PokemonGoApp** is designed to efficiently import data from Excel sheets and insert it into the database. It offers a set of CRUD operations to manipulate the imported data. The application also provides a flexible search mechanism based on the query parameters you send. Additionally, it is thoroughly tested using Sinon to ensure code quality and reliability.

- **Excel Data Import:** The application allows you to upload Excel sheets, which are then processed and inserted into the database.

- **CRUD Operations:** After data is inserted, **PokemonGoApp** provides Create, Read, Update, and Delete operations for managing the imported records.

- **Search Functionality:** The "List" endpoint supports various query parameters, enabling you to filter and search for specific records based on your criteria.

- **Unit Testing:** The application is rigorously tested using Sinon to ensure code quality and reliability.

## Endpoints
**PokemonGoApp** offers various endpoints to facilitate specific functionalities.

### Error Handler
- **Description:** This endpoint is dedicated to handling errors at the application level.

### CRUD Operations
- **Description:** Our application supports CRUD (Create, Read, Update, Delete) operations on specific resources. Each operation corresponds to a dedicated endpoint.

### List
- **Description:** The "List" endpoint enables users to retrieve items with various query parameters, including pagination, name search, type search, and evaluation state.

## Request Body Validation
- **Description:** Joy validation is applied to the entire `requests.body` to ensure data integrity.

## Conclusion
This documentation provides a comprehensive guide to **PokemonGoApp**. For detailed usage instructions, please refer to the corresponding sections. If you have any questions or need further assistance, please don't hesitate to reach out.

### Feedback and Contributions
We welcome your feedback and contributions to make **PokemonGoApp** even better. Please follow our guidelines for contributions, which can be found in the "Additional Information" section.
