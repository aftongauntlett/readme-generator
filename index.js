// start with my variables for libraries
const inquirer = require("inquirer")
const fs = require("fs")
const axios = require("axios")

// -- create an array of questions/objects using const, since I don't want these to change -- //
const questions = [{
    type: "input",
    message: "Enter your Github username",
    name: "username"
},
// replaced with github api pull - but does not work if email is set to private. (null)
// {
//     type: "input",
//     message: "Enter your email address",
//     name: "email"
// },

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
    name: "license"
},

{
    type: "input",
    message: "What command should be run to install dependencies?",
    name: "installation"
},

{
    type: "input",
    message: "What command should be run to run tests?",
    name: "test"
},

{
    type: "input",
    message: "Getting Started",
    name: "start"
},
]

// create writetoFile function and use fs to save to the generated readme file, save that to a folder I created called output.
function writeToFile(fileName, data) {
    fs.writeFile("output/" + fileName, data, function (err) {
        if (err) return console.log(err);
    })
}

// Create a function to run through all questions and output them into a readme
function init() {
    inquirer.prompt(questions).then(function (userInputObject) {
        console.log(userInputObject, userInputObject.username)
        let username = userInputObject.username
        const queryUrl = `https://api.github.com/users/${username}`;

        axios.get(queryUrl).then(function (response) {
            const userAvatar = response.data.avatar_url
            let output = "# " + userInputObject.project

            output += "\n\n" + `![GitHub followers](https://img.shields.io/github/followers/${username}?style=social)`
            output += "\n\n```\n Developed by:" + userInputObject.username + " \n```\n"
            output += "\n\nEmail: " + response.data.email
            output += "\n\nProject Name: " + userInputObject.project
            output += "\n\nProject URL: " + userInputObject.projectURL
            output += "\n\nProject description: " + userInputObject.discription
            output += "\n\nLicenses Used: \n* " + userInputObject.license
            output += "\n\nInstallation information: " + userInputObject.installation
            output += "\n\nHow to run a test: " + userInputObject.test
            output += "\n\nGetting Started: " + userInputObject.start
            output += "\n\n![profile picture](" + response.data.avatar_url + ")"

            writeToFile("readme.md", output)
        })
    });

}

// run the function init
init();

