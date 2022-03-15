const DatabaseManager = require('./databasemanager');
const inquirer = require('inquirer');
const cTable = require('console.table');

// initialize the database manager class
const db = new DatabaseManager();

// Function to validate inquirer inputs to make sure they fit the database specs
const confirmCharLength = async (input) => {
    if (input.length > 30 || input.length == 0 || input.length == null || input.length == undefined) {
        return 'Must have between 1 and 30 characters.';
    } else {
        return true;
    }
};

// inquirer prompt and data manipulation to add a department
const addDepartment = async () => {
    const data = await inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Department name',
            validate: confirmCharLength
        }
    ]);
    return data;
};

// inquirer prompt and data manipulation to add a role
const addRole = async () => {
    const departments = await db.viewDepartments();
    const options = departments[0].map(department => department.name);
    const ids = departments[0].map(department => department.id);
    const data = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Role title',
            validate: confirmCharLength
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Salary'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Select a department',
            choices: options
        }
    ]);
    const department_id = ids[options.indexOf(data.department)];
    data.department = department_id;
    return data;
};

// inquirer prompt and data manipulation to add an employee
const addEmployee = async () => {
    // get the roles info
    const roles = await db.viewRoles();
    const role_options = roles[0].filter((role)=> (role.title == null) ? false : true).map(role => role.title);
    const role_ids = roles[0].map(role => role.id);
    // get the manager info
    const managers = await db.viewManagers();
    const manager_options = managers[0].map(manager => manager.id + ' ' +manager.first_name + ' ' + manager.last_name);
    manager_options.push('None');
    const manager_ids = managers[0].map(manager => manager.id);
    
    const data = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'First name',
            validate: confirmCharLength
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Last name',
            validate: confirmCharLength
        },
        {
            type: 'list',
            name: 'role',
            message: 'Employee role',
            choices: role_options
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select a department',
            choices: manager_options
        }
    ]);
    data.role = role_ids[role_options.indexOf(data.role)];
    if (data.manager == 'None') {
        data.manager = null;
    } else {
        data.manager = manager_ids[manager_options.indexOf(data.manager)];
    }
    return(data);
};

// Main program inquirer menu. This function runs in a loop until the user quits
const mainMenu = async () => {
    const option = await inquirer.prompt([
        {
            type: 'list',
            name: 'main_options',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Quit'
            ]
        }
    ]);
    switch (option.main_options) {
        case 'View all departments':
            let departments = await db.viewDepartments();
            console.table(departments[0]);
            break;
        case 'View all roles':
            const roles = await db.viewRoles();
            console.table(roles[0]);
            break;
        case 'View all employees':
            const employees = await db.viewEmployees();
            console.table(employees[0]);
            break;
        case 'Add a department':
            const results = await addDepartment();
            await db.addDepartment(results.department_name);
            let newDepartments = await db.viewDepartments();
            console.table(newDepartments[0]);
            break;
        case 'Add a role':
            const data = await addRole();
            await db.addRole(data.title, data.salary, data.department);
            let newRoles = await db.viewRoles();
            console.table(newRoles[0]);
            break;
        case 'Add an employee':
            const newEmployee = await addEmployee();
            await db.addEmployee(newEmployee.first_name, newEmployee.last_name, newEmployee.role, newEmployee.manager);
            let newEmployees = await db.viewEmployees();
            console.table(newEmployees[0]);
            break;
        case 'Quit':
            process.exit(0);
    }
    mainMenu();
};
mainMenu();


