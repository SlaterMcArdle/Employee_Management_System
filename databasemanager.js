const mysql = require('mysql2/promise');
require('dotenv').config();

class DatabaseManager {
    constructor() {}
    // create  new database connection
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
    async viewManagers() {
        const db = await this.connectToDatabase();
        const roles = await this.viewRoles();
        const manager_role_id_index = roles[0].findIndex(role => role.title == 'Manager');
        const manager_role_id = roles[0][manager_role_id_index].id;
        const result = await db.execute(`SELECT * FROM employee WHERE role_id = ?;`, [manager_role_id]);
        return result;
    }
    // add info to database
    async addDepartment(name) {
        const db = await this.connectToDatabase();
        try {
            let result = await db.execute(`INSERT INTO department (name) 
                                        VALUES (?);`, [name]);
            return result;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    async addRole(title, salary, department_id) {
        const db = await this.connectToDatabase();
        try {
            let result = db.query(`INSERT INTO roles (title, salary, department_id)
                             VALUES (?, ?, ?);`, [title, salary, department_id]);
            return result;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    async addEmployee(first_name, last_name, role_id, manager_id) {
        const db = await this.connectToDatabase();
        try {
            let result = db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                             VALUES(?, ?, ?, ?);`, [first_name, last_name, role_id, manager_id]);
            return result;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = DatabaseManager;