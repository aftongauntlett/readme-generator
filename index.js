const inquirer = require("inquirer")
const fs = require("fs")
const axios = require("axios")

// -- created an array of questions/objects -- //
const questions = [{
    type: "input",
    message: "Enter your Github username",
    name: "username"
},

{
    type: "input",
    message: "Enter your email address",
    name: "email"
},

{
    type: "input",
    message: "Enter the URL for your project",
    name: "projectURL"
},

{
    type: "input",
    message: "What is the name of your project?",
    name: "project"
},

{
    type: "input",
    message: "Briefly desribe your project",
    name: "description"
},

{
    type: "list",
    message: "What kind of license should your project have?",
    choices: ["MIT", "Apache 2.0", "GNU GPLv3", "Mozilla Public License 2.0"],
    name: "table"
},

{
    type: "input",
    message: "What command should be run to install dependencies?",
    name: "installation"
},

{
    type: "input",
    message: "What command should be run to run tests?",
    name: "tests"
},

{
    type: "input",
    message: "What does the user need to know about using the repo?",
    name: "repo"
},
]

// -- They give us a writeToFile() FUNCTION, Looks like we may need to read/write to a file. What BUILT-IN node module will help us out with this (?) -- // 
function writeToFile(fileName, data) {
}

// -- This is a fairly common programming construct. They are just giving us a FUNCTION to INITIALIZE or SETUP our project parameter. It's also where we usually kick off our project flow -- //

function init() {
    inquirer.prompt(questions).then(function (userInputObject) {
        console.log(userInputObject, userInputObject.username)
    })
}

// -- We DEFINED our INITALIZATION FUNCTION above, here we are just kicking off (running) our program. -- // 
init();




// replaces for loop
// questions.map(questions => {
//     console.log(questions)
// })

// read me badge 
// ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/aftongauntlett/portfolio)