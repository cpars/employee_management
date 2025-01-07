// Importing required libraries
import inquirer from 'inquirer'; // For interactive CLI promtps
import pkg from 'pg'; // PostgreSQL client
const { Client } = pkg; 


// Configure PostgreSQL client
// Replace the values with your own PostgreSQL connection details
const client = new Client({
    user : 'postgres', // PostgreSQL username
    host : 'localhost', // Host where the PostgreSQL server is running
    database: 'employee_management', // Name of the database
    password: 'codepass', // Password for the PostgreSQL user
    port: 5432, // Port where the PostgreSQL server is running
});

// Connect to the PostgreSQL server
client.connect();

// Main menu for the application
async function mainMenu() {
    // Prompt the user to choose an action
    const {choice} = await inquirer.prompt([
        {
            type: 'list', // List prompt type
            name: 'choice', // The name of the response object
            message: 'What would you like to do?', // The prompt message
            choices: [ // The list of choices
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit'
            ],
        },
    ]);

    // Perform the action based on the user's choice
    switch (choice) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Quit':
            console.log('Goodbye!');
            client.end(); // Close the PostgreSQL connection
            process.exit(); // Exit the Node.js process
    }

    // Return to the main menu after an action is taken
    mainMenu();
}

// View all departments
async function viewDepartments() {
    const res = await client.query('SELECT * FROM departments;');
    console.table(res.rows);
}

// View all roles
async function viewRoles() {
    const res = await client.query(`SELECT roles.id, roles.title, roles.salary, departments.name AS department 
                                    FROM roles JOIN departments ON roles.department_id = departments.id;`);
    console.table(res.rows); // Display the results in a table
}

// View all employees
async function viewEmployees() {
    // Query to select all employees with their job title, department, salary, and manager
    const res = await client.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, 
                                    departments.name AS department, roles.salary, 
                                    COALESCE(manager.first_name || ' ' || manager.last_name, 'None') AS manager
                                    FROM employees
                                    JOIN roles ON employees.role_id = roles.id
                                    JOIN departments ON roles.department_id = departments.id
                                    LEFT JOIN employees AS manager ON employees.manager_id = manager.id;`);
    console.table(res.rows); // Display the results in a table
}

// Add a department
async function addDepartment() {
    // Prompt the user to enter the name of the department
    const {name} = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department',
        },
    ]);
    // Insert the department into the database
    await client.query('INSERT INTO departments (name) VALUES ($1);', [name]);
    console.log(`Department "${name}" added!`);
}

// Add a role
async function addRole() {
    const departments = await client.query('SELECT * FROM departments;');
    const departmentChoices = departments.rows.map((d) => ({
        name: d.name,
        value: d.id,
    }));
    // Prompt the user to enter the role details
    const { title, salary, department_id } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the role title:' },
        { type: 'input', name: 'salary', message: 'Enter the role salary:' },
        {
          type: 'list',
          name: 'department_id',
          message: 'Select the department for this role:',
          choices: departmentChoices,
        },
      ]);
      // Insert the role into the database
    await client.query(
        'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3);',
        [title, salary, department_id]
    );
      console.log(`Role "${title}" added!`);
    
}

// Add an employee
async function addEmployee() {
    // Get the list of roles and managers
    const roles = await client.query('SELECT * FROM roles;');
    const roleChoices = roles.rows.map((r) => ({ name: r.title, value: r.id }));
  
    // Get the list of employees to choose a manager
    const employees = await client.query('SELECT * FROM employees;');
    const managerChoices = employees.rows.map((e) => ({
      name: `${e.first_name} ${e.last_name}`,
      value: e.id,
    }));
    managerChoices.unshift({ name: 'None', value: null });

    // Prompt the user to enter the employee details
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        { type: 'input', name: 'first_name', message: "Enter the employee's first name:" },
        { type: 'input', name: 'last_name', message: "Enter the employee's last name:" },
        {
          type: 'list',
          name: 'role_id',
          message: "Select the employee's role:",
          choices: roleChoices,
        },
        {
          type: 'list',
          name: 'manager_id',
          message: "Select the employee's manager:",
          choices: managerChoices,
        },
      ]);
      // Insert the employee into the database
      await client.query(
        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);',
        [first_name, last_name, role_id, manager_id]
      );
      console.log(`Employee "${first_name} ${last_name}" added!`);
    }

// Update an employee role
async function updateEmployeeRole() {
    // Get the list of employees and roles
    const employees = await client.query('SELECT * FROM employees;');
    const employeeChoices = employees.rows.map((e) => ({
      name: `${e.first_name} ${e.last_name}`,
      value: e.id,
    }));
    // Get the list of roles
    const roles = await client.query('SELECT * FROM roles;');
    const roleChoices = roles.rows.map((r) => ({ name: r.title, value: r.id }));
    // Prompt the user to select an employee and a new role
    const { employee_id, role_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee to update:',
        choices: employeeChoices,
      },
      {
        type: 'list',
        name: 'role_id',
        message: "Select the employee's new role:",
        choices: roleChoices,
      },
    ]);
    // Update the employee's role in the database
    await client.query('UPDATE employees SET role_id = $1 WHERE id = $2;', [role_id, employee_id]);
    console.log('Employee role updated!');
  }
  
  // Start the application
  mainMenu().catch((err) => console.error(err.stack));