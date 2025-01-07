# Employee Management System

## Description

The **Employee Management System** is a command-line application that allows business owners to efficiently manage their company's employee database. Built with Node.js, PostgreSQL, and Inquirer.js, this tool provides a user-friendly interface to perform CRUD operations on departments, roles, and employees.

## Features

- **View All Departments**: Display a formatted table of department names and IDs.
- **View All Roles**: Display job titles, role IDs, salaries, and associated departments.
- **View All Employees**: View comprehensive employee data, including IDs, names, job titles, salaries, departments, and managers.
- **Add a Department**: Add a new department to the database.
- **Add a Role**: Create new roles with titles, salaries, and associated departments.
- **Add an Employee**: Add employees with names, roles, and managers.
- **Update an Employee Role**: Update an employee's role in the database.

## Technologies Used

- [Node.js](https://nodejs.org/): For backend scripting and running the application.
- [PostgreSQL](https://www.postgresql.org/): For database management.
- [Inquirer.js](https://www.npmjs.com/package/inquirer): For creating an interactive command-line interface.
- [pg](https://www.npmjs.com/package/pg): PostgreSQL client for Node.js.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/employee-management-system.git
   cd employee-management-system
   ```
2. Install Dependencies:
    ```bash
    npm install
    ```
3. Set up the PostgreSQL database:
    - Create the databse
    ```sql
    CREATE DATABASE employee_management;
    ```
    - Switch to the database
    ```sql
    \c employee_management
    ```
    - Creat the required tables
    ```sql
    CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
    );

    CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary NUMERIC NOT NULL,
    department_id INT REFERENCES departments(id)
    );

    CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT REFERENCES roles(id),
    manager_id INT REFERENCES employees(id) ON DELETE SET NULL
    );
    ```
4. Update the database connection settings in app.js:
    ```javascript
    const client = new Client({
    user: 'your_postgres_username',
    host: 'localhost',
    database: 'employee_management',
    password: 'your_postgres_password',
    port: 5432,
    });
    ```
5. Start the application:
    ```bash
    node app.js
    ```

## Application Workflow

### Main Menu
- **View All Departments**: Displays a list of all departments with their IDs.
- **View All Roles**: Shows job titles, role IDs, salaries, and associated departments.
- **View All Employees**: Displays employee details including names, job titles, salaries, departments, and managers.
- **Add a Department**: Allows you to create a new department in the database.
- **Add a Role**: Prompts you to enter a role title, salary, and assign it to a department.
- **Add an Employee**: Enables adding a new employee with a role and manager assignment.
- **Update an Employee Role**: Allows you to update an employee's role.
- **Quit**: Exits the application.

### Example Commands
- Add a new role with a salary and associate it with a department.
- Update an employee's role to reflect changes in their responsibilities.

## Known Issues

- **No Selectable Choices Error**: Occurs when adding a role without having any departments in the database. Ensure departments are added first.
- **Employee Hierarchy Validation**: Currently, no strict validation is enforced for employee-manager relationships beyond assigning a manager.

## Future Enhancements

- **Search Functionality**: Add the ability to search for employees, roles, or departments by name or ID.
- **Cascading Deletes**: Implement cascading deletes for roles and departments to ensure dependent data is handled correctly.
- **Department Budgets**: Include reporting features to calculate and display department budgets.
- **Enhanced UI**: Transition to a graphical user interface (GUI) for a more user-friendly experience.
- **Role Hierarchies**: Add support for defining role hierarchies and responsibilities.


## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software, provided that the original license and copyright notice are included.

## Contributions

Contributions are welcome! If you have suggestions for improvements or want to add new features, feel free to fork the repository, make your changes, and submit a pull request. Please follow the project's code of conduct.

## Contact

For questions, feedback, or support, feel free to reach out:

- **Name**: Corey
- **Email**: cparsons0730@yahoo.com
- **GitHub**: [cpars](https://github.com/cpars)
