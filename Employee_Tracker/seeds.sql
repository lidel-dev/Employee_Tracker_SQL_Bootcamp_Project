INSERT INTO department (names)
VALUES ("meat"),
    ("seafood"),
    ("produce"),
    ("dairy");
INSERT INTO roles (title, salary, department_id)
VALUES ("team member", 10, 1),
    ("assistant team leader", 50, 1),
    ("team leader", 100, 3),
    ("store manager", 1000, 2),
    ("distributor", 100000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("ben", "johnson", "team member", 12),
    ("jacob", "jacobson", "team leader", 14),
    ("thomas", "jefferson", "distributor", 15),
    ("isaac", "newton", "team leader", 2);