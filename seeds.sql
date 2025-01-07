-- Seed data for departments
INSERT INTO departments (name) VALUES
('Human Resources'),
('Engineering'),
('Finance'),
('Marketing'),
('Sales');

-- Seed data for roles
INSERT INTO roles (title, salary, department_id) VALUES
('HR Manager', 80000, 1),
('Software Engineer', 100000, 2),
('Accountant', 70000, 3),
('Marketing Specialist', 60000, 4),
('Sales Representative', 50000, 5);

-- Seed data for employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Johnson', 1, NULL), -- HR Manager
('Bob', 'Smith', 2, NULL),    -- Software Engineer
('Charlie', 'Brown', 3, NULL), -- Accountant
('Daisy', 'Taylor', 4, NULL),  -- Marketing Specialist
('Eve', 'Adams', 5, NULL),     -- Sales Representative
('Frank', 'White', 2, 2),      -- Software Engineer reporting to Bob
('Grace', 'Green', 5, 5);      -- Sales Representative reporting to Eve
