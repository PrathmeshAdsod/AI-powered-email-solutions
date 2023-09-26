import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState('');
  const [outputEmail, setOutputEmail] = useState('');

  const API_TOKEN  =  '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'

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  
  async function query1() {
    try {
      const response = await axios({
        method: "post",
        url: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        data: {
          inputs: "The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.",
        },
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const result = response.data[0].summary_text;
      setOutputEmail(result)
      return result;
    } catch (error) {
      console.error('Error generating text:', error);
    }
  }

  

  const query = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "https://api-inference.huggingface.co/models/google/flan-t5-base",
        data: {
          inputs: `Generate a sample email for me in proper format `, // Modify the input text as needed
        },
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const result = response.data[0];
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  const prompt_to_generate_email = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        data: {
          inputs:
            "Generate a sample email for me to give feedback to our client. Email should be formatted so I can copy it and paste it properly",
        },
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const result = response.data[0]["generated_text"];
      setOutputEmail(result); // Set the outputEmail directly without JSON.stringify
    } catch (error) {
      setOutputEmail(`error : ${error}`);
    }
  };

  return (
    <>
      <div>
        <h1>GPT Text Generator</h1>
        <textarea
          placeholder="Enter text here..."
          value={inputText}
          onChange={handleInputChange}
          rows={6}
          cols={50}
        ></textarea>
        <br />
        <button onClick={query1}>Generate Text</button>
        <h2>Generated Text:</h2>
        <p>{outputEmail}</p>
      </div>
    </>
  );
}
export default App;
