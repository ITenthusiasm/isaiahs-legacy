/* Utility to facility easily resetting the JSON Server DB */
const path = require("path");
const fs = require("fs").promises;

// Routes where JSON Server will look for data
const routes = {
  users: undefined,
  todos: undefined,
};

// Data for the corresponding routes
const usersData = [
  {
    username: "friendly_user",
    password: "friendly_user",
    id: 1,
  },
];

const todosData = [
  {
    userId: 1,
    text: "Wash the tomatoes",
    id: 2,
  },
  {
    userId: 1,
    text: "Eat Swiss cheese!",
    id: 4,
  },
];

// Assign the data to the JSON server routes
routes.users = usersData;
routes.todos = todosData;

// Create the JSON structure for the DB file and write to it
databaseJson = JSON.stringify(routes, null, 2);

const dbFile = path.join(__dirname, "../db.json");
fs.writeFile(dbFile, `${databaseJson}\n`);
