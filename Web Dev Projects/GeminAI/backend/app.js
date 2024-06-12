require("dotenv").config();
const express = require("express");
// Set up your API key as an environment variable (see "Set up your API key" below) require("dotenv").config();
const {GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above) const genAI = new GoogleGenerativeAI (process.env.API_KEY);
const genAI=new GoogleGenerativeAI(process.env.API_KEY);

// Define a function to run the model
async function run() {

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

// Define a prompt
const prompt = "Write a story about a magic backpack."
const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text(); 
console.log(text);
}

// Run the model
run();
