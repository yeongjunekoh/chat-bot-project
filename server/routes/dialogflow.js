const express = require("express");
const router = express.Router();
const structjson = require("./structjson.js");
const dialogflow = require("dialogflow");
const uuid = require("uuid");

const config = require("../config/keys");
//We need projectId, sessionId to make new session
const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

// Create a new session(When we send request the dialog API We need to create new session)
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

//We will make two routes

//Text Query routes

router.post("/textQuery", async (req, res) => {
  //We need to send some information that comes from client to the Dialogflow API
  //How to send information?

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.text,
        //This Text not a hard coding but dynamic coding
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);

  //send back responses to front
  res.send(result);
});

//Event Query routes

module.exports = router;
