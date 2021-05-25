import React from "react";
import { text } from "body-parser";
import Axios from "axios";

function Chatbot() {
  const textQuery = async () => {
    //first need to take care of message I sent
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };

    const textQueryVariables = { text };

    //we need to take care of the message the chatbot sent
    try {
      //I will send request to the textQuery Route
      const response = await Axios.post(
        "/api/dialogflow/textQuery",
        textQueryVariables
      );
      const content = response.data.fulfillmentMessages[0];

      conversation = {
        who: "bot",
        content: content,
      };
      console.log(conversation);
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error just ocurred, please check the problem",
          },
        },
      };
      console.log(conversation);
    }
  };

  const keyPressHandler = (e) => {
    //we type Enter. not enter
    if (e.key === "Enter") {
      if (!e.target.value) {
        alert("you need to type something first");
      }
      //we will send request to text query route -> we have to make textQuery function
      textQuery(e.target.value);

      e.target.value = "";
    }
  };
  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}></div>
      <input
        style={{
          margin: 0,
          width: "100%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a message..."
        onKeyPress={keyPressHandler}
        type="text"
      />
    </div>
  );
}

export default Chatbot;
