//connections

// const cTable = require('console.table');
const connection = require("./db/connection.js")
const { prompt } = require("inquirer");
const Sequelize = require("sequelize");
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');
const { default: Choice } = require("inquirer/lib/objects/choice");
const { Router } = require("express");
const db = require('./db/connection.js');



//connects to the db
db.connect(err => {
    if (err) throw err;
    console.log('connected successfully');
});


// require('console.table');

//routes
// app.get('/select', (req, res) => {
//     res.send('select')
// })

// app.get('/insert', (req, res) => {
//     res.send('select')
// })

// app.get('/delete', (req, res) => {
//     res.send('select')
// })

// Router.get('/', function (req, res, next) {
//     connection.query('SELECT * FROM employee ORDER BY id desc', function (err, rows) {
//         if (err) {
//             req.flash('error', err)
//             res.render('profile', { data: '' })
//         } else {
//             res.render('profile', { data: rows })
//         }
//     })
// })
// module.exports = Router


//function to display the prompts in the command line
function initialPrompts() {
    {
        prompt([{
            type: "list", name: "choice", message: "What would you like to do?", choices: [
                { name: "View All Employees", value: "View All Employees" },
                { name: "Add Employee", value: "Add Employee" },
                { name: "Update Employee Role", value: "Update Employee Role" },
                { name: "View All Roles", value: "View All Roles" },
                { name: "Add Role", value: "Add Role" },
                { name: "View All Departments", value: "View All Departments" },
                { name: "Add Departments", value: "addDepartments" }
            ]
            //links the prompts to corrosponding functions
        }]).then(answers => {
            console.log(answers)
            switch (answers.choice) {

                case "View All Employees":
                    return viewEmployee();
                case "Add Employee":
                    return addEmployee();
                case "Update Employee Role":
                    return updateRole();
                case "View All Roles":
                    return viewRoles();
                case "Add Role":
                    return addRole();
                case "View All Departments":
                    return viewDepartments();
                case "Add Departments":
                    return addDepartment();
            }
        })

    }
};

// function viewEmployees() {
//     return connection.promise().query(`SELECT * FROM employee;`).then(
//         answers => {
//             console.log(answers);
//         }
//     )
// connection.connect(function (err) {
//     if (err) throw err;
//     connection.query("SELECT * FROM customers", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//     });
// })
// };





//view functions

//view employee
function viewEmployee() {
    connection.query("SELECT * FROM employee", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        initialPrompts();
    });
};

//view roles
function viewRoles() {
    connection.query(
        `SELECT * FROM roles`,
        function (err, result, fields) {
            if (err) throw err;
            console.table(result);
            initialPrompts();
        }
    );
};

//view departments
function viewDepartments() {
    db.query(
        `SELECT * FROM department`,
        function (err, result, fields) {
            if (err) throw err;
            console.table(result);
            initialPrompts();
        }
    );
};



//add functions

//add employee
function addEmployee() {
    prompt([
        {
            name: "firstName",
            message: "What is the first name?"
        },
        {
            name: "lastName",
            message: "What is the last name?"
        },
        {
            name: "employeeRole",
            message: "What is the employees role?"
        },
        {
            name: "employeeManager",
            message: "What is the managers ID?"
        }
    ])
        .then(answers => {
            console.log(answers)

            var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', '${answers.employeeRole}', '${answers.employeeManager}')`
            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted, ID: " + result.insertId);
            });
        });
};

//add role
function addRole() {
    prompt([
        {
            name: "roleName",
            message: "What is the name of the role?"
        },
        {
            name: "roleSalary",
            message: "What is the salary of the role?"
        },
        {
            name: "roleID",
            message: "Which department does the role belong to?"
        }
    ]).then(answers => {
        console.log(answers)

        var sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.roleName}', '${answers.roleSalary}', '${answers.roleID}')`
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted, ID: " + result.insertId);
        });
    });

};

//add department
function addDepartment() {
    //ask what is the name?

};

//update function

//update role
function updateRole() {
    //ask which employees role would you like to update?
    //ask which role would you like to assign to the selected employee?
    connection.query("SELECT * FROM employee", function (err, result, fields) {
        if (err) throw err;
        console.table(result);

        prompt([
            {
                name: "updateWho",
                type: "list",
                choices: result.map(employee => `${employee.first_name} ${employee.last_name}`),
                message: "Which employees role would you like to update?"
            },
            {
                name: "assignWho",
                message: "Which role would you like to assign to the selected employee?"
            }
        ]).then(answers => {
            console.log(answers)


        });
    });
};

//run the initial function
initialPrompts();