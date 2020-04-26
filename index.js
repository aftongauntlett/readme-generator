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
    choices: ["MIT", "ISC License", "None"],
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

            // create object that allows user to select a license and auto generate the entire license into the readme
            const licenses = {
                // pull current year and the entered username into the license
                MIT: `MIT License

Copyright(c) [${new Date().getFullYear()}] [${username}]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files(the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/ or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,

                'ISC License': `ISC License 
                
Copyright(c) [${new Date().getFullYear()}] [${username}]

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`
            }

            // output all info into the readme based on user input
            output += "\n\n" + `![GitHub followers](https://img.shields.io/github/followers/${username}?style=social)`
            output += "\n\n```\n Developed by: " + userInputObject.username + " \n```\n"
            output += "\n\n# " + userInputObject.project
            output += "\n\n Deployed at: " + userInputObject.projectURL
            output += "\n\nContact Me: " + response.data.email
            output += "\n\n## Project Description\n" + userInputObject.discription
            output += "\n\n## Installation Information\n" + userInputObject.installation
            output += "\n\n## Getting Started\n" + userInputObject.start
            output += "\n\n## How to Run a Test\n " + userInputObject.test
            output += "\n\n## License Used\n* " + licenses[userInputObject.license]
            output += "\n\n![profile picture](" + response.data.avatar_url + ")"

            // add writetofile here
            writeToFile("readme.md", output)
        })
    });

}

// run the function init
init();

