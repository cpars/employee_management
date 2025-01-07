DROP DATABASE IF EXISTS employee_management;
CREATE DATABASE employee_management;
\c employee_management;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT REFERENCES departments(id)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL REFERENCES roles(id),
    manager_id INT REFERENCES employees(id) ON DELETE SET NULL
);