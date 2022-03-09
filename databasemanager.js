const mysql = require('mysql2');
require('dotenv').config();

class DatabaseManager {
    constructor() {}
    // get info from database
    async viewDepartments() {
        const db = await mysql.createConnection(
            {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            }
        );
        const result = db.execute(`SELECT * FROM department;`);
        console.log(result);
        return result;
    }
    viewRoles() {
        this.db.query(`SELECT * FROM roles;`, (err, results) => {  
            console.log(err);
            console.log(results);
            return results;
        });
    }
    viewEmployees() {
        this.db.query(`SELECT * FROM employee;`, (err, results) => {
            return results;
        });
    }
    viewManagers() {
        this.db.query(`SELECT first_name, last_name FROM employee WHERE role_id=1;`, (err, results) => {
            return results;
        });
    }
    // add info to database
    addDepartment(name) {
        this.db.query(`INSERT INTO department (name) VALUES (${name});`, (err, results) => {
            return results;
        });
    }
    addRole(title, salary, department_id) {
        this.db.query(`INSERT INTO roles (title, salary, department_id)
                             VALUES (${title}, ${salary}, ${department_id});`, (err, results) => {
                                 return results;
                             });
    }
    addEmployee(first_name, last_name, role_id, manager_id) {
        this.db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                             VALUES(${first_name}, ${last_name}, ${role_id}, ${manager_id};`, (err, results) => {
                                 return results;
                             });
    }
    // delete info from database
    deleteDepartment(id) {
        this.db.query(`DELETE FROM department WHERE id = ${id};`, (err, results) => {
            return results;
        });
    }
    deleteRole(id) {
        this.db.query(`DELETE FROM roles WHERE id = ${id};`, (err, results) => {
            return results;
        });
    }
    deleteEmployee(id) {
        this.db.query(`DELETE FROM employee WHERE id = ${id};`, (err, results) => {
            return results;
        });
    }
    // async totalDepartmentBudget(id) {
    //     await this.db.query(``)
    // }
}

module.exports = DatabaseManager;