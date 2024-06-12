require("dotenv").config();
const express = require("express");
// Set up your API key as an environment variable (see "Set up your API key" below) require("dotenv").config();
const {GoogleGenerativeAI } = require("@google/generative-ai");

//!express instance
const app = express();

//!middleware
app.use(express.json());

//!generate content route
app.post("/generate", async (req, res) => {
    const { prompt } = req.body;
    try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text(); 
   res.send(text);
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error| Failed to generate content" });
    }
   
});

// Access your API key as an environment variable (see "Set up your API key" above) const genAI = new GoogleGenerativeAI (process.env.API_KEY);
const genAI=new GoogleGenerativeAI(process.env.API_KEY);


//!start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000")
});

