const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//GET  /developers

app.get("/developers", function (request, response) {
  // request is an object with lots of info about the request
  // response is an object which allows us to define what kind of response we want to send back
  connection.query("SELECT * FROM Developers", function(err, data) {
    response.status(200).json({
      developers: [
        { 
          name: "Ena", 
          available: true, 
          dateJoined: "2020-01-09", 
          skills: "HTML, CSS, React, NodeJS, AWS, Git", 
          id: 1 
        },
        { 
          name: "Sue", 
          available: false, 
          dateJoined: "2019-03-27", 
          skills: "Agile, AWS, CSS", 
          id: 2 
        },
        { 
          name: "Karen", 
          available: true, 
          dateJoined: "2019-10-28", 
          skills: "TDD, Git, HTML", 
          id: 3 
        }
      ]
    })
  });
});

//POST /developers?name=Hannah

app.post("/developers", function(request, response) {

  const newDeveloper = request.body;
  
    response.status(200).json({
      message: `Received a request to add developer with name: ${newDeveloper.name} available: ${newDeveloper.available}, dateJoined: ${newDeveloper.dateJoined}, skills: ${newDeveloper.skills}`
    });
  });

//PUT /developers

app.put("/developers/:id", function(request, response) {

/*
// For sensitive data or larger pieces of data, I can use the request body
{ name: "Fred", available: true, skills: "HTML and CSS" }
*/
  const updatedDeveloper = request.body;
  const id = request.params.id; 

  response.status(200).json({
    message: `Successfully updated developer ID ${id} with name: ${updatedDeveloper.name}, available: ${updatedDeveloper.available}, skills: ${updatedDeveloper.skills}`
  });
});

//DELETE / developers
app.delete("/developers/:id", function(request, response) {

    const id = request.params.id; 
  
    response.status(200).json({
      message: `Successfully deleted developer ID ${id}`
    });
  });

module.exports.app = serverlessHttp(app);