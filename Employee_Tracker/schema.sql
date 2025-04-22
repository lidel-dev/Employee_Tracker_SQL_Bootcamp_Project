DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    names VARCHAR(30)
);
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- role_name VARCHAR(30),
    title VARCHAR(30),
    salary INT,
    department_id INT
);
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id VARCHAR(30),
    manager_id INT
);