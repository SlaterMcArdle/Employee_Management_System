const DatabaseManager = require('./databasemanager');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = new DatabaseManager();
const confirmCharLength = async (input) => {
    if (input.length > 30 || input.length == 0 || input.length == null || input.length == undefined) {
        return 'Must have between 1 and 30 characters.';
    } else {
        return true;
    }
};
const addDepartment = async () => {
    const data = await inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Department name',
            validate: confirmCharLength
        }
    ]);
    console.log(data);
    // return data;
};
const addRole = async () => {
    const departments = db.viewDepartments();
    const options = departments.map(departments.name);
    const ids = departments.map(departments.id);
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
    // const department_id = ids[options.indexOf(data.department)];
    // addRole(data.title, data.salary, department_id);
    console.log(data);
};
const addEmployee = async () => {
    // get the roles info
    const roles = db.viewRoles();
    const role_options = roles.map(roles.title);
    const role_ids = roles.map(roles.id);
    // get the role id for manager
    const manager_role_id = roles.find(role => role.title == 'Manager');
    // pull the employees and find the managers
    const employees = db.viewEmployees();
    const managers = employees.filter(employee => employee.role_id == manager_role_id);
    const managerNameList = (managers) => {
        let managerNameList = [];
        for (const manager in managers) {
            const managerName = manager.first_name + ' ' + manager.last_name;
            managerNameList.push(managerName);
        }
    };
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
            choices: managerNameList
        }
    ]);
    console.log(data);
}
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
                'quit'
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
            departments = await db.viewDepartments();
            console.table(departments[0]);
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        case 'quit':
            return;
    }
}
mainMenu();


