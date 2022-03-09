const mysql = require('mysql2/promise');
require('dotenv').config();

class DatabaseManager {
    constructor() {}

    async connectToDatabase() {
        const db = await mysql.createConnection(
            {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            }
        );
        return db;
    }
    // get info from database
    async viewDepartments() {
        const db = await this.connectToDatabase();
        const result = await db.query(`SELECT * FROM department;`);
        return result;
    }
    async viewRoles() {
        const db = await this.connectToDatabase();
        const result = await db.query(`SELECT * FROM roles;`);
        return result;
    }
    async viewEmployees() {
        const db = await this.connectToDatabase();
        const result = await db.query(`SELECT * FROM employee;`);
        return result;
    }
    // add info to database
    async addDepartment(name) {
        db = await this.connectToDatabase();
        const result = await db.query(`INSERT INTO department (name) VALUES (${name});`);
        return result;
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