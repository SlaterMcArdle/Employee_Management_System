INSERT INTO department (name)
VALUES  ("Accounting"),
        ("Sales"),
        ("Tech"),
        ("corporate");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Manager", 63.00, 4),
        ("Accounts Payable", 45.00, 1),
        ("Web Master", 52.00, 3),
        ("Sales Associate", 22.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jane", "Doe", 1, NULL),
        ("Joe", "Schmoe", 4, 1),
        ("Dan", "Boyle", 3, 1),
        ("Anne", "Bolin", 2, 1);