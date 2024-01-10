// import express
const express = require("express");

//import send email module
const sendEmail = require("./utils/send-email");

// set port environment variable
//!process.env.PORT variable that holds the value of the environment variable ie variable that holds the value of the environment variable
//it's like a random port if the environment variable is set, and a default port (3001 in this case) if it is not set.
const PORT = process.env.PORT || 3001;

// create express app instance
const app = express();

//set view engine - to render views
app.set("view engine", "ejs");

//serve static assets , help them render without routing 
//!middleware in use
//? the .use configures the middleware.
//!express.static is a middleware that serves static files
app.use(express.static("public"));

//pass data from form, client to server, frontend to backend
//!middleware in use
//?parses URL-encoded bodies
//!express.urlencoded is a middleware that parses URL-encoded bodies, extended: false means it won't parse nested objects and arrays
app.use(express.urlencoded({ extended: false }));

//route to render the email form
//?home route
app.get("/", (req, res) => {
    res.render("email-index");
});

//route to send email
app.post('/send-email', async (req, res) => {
   const {email, message} = req.body;
    try{
        await sendEmail(email, message);
        res.render("email-index", {
            status : 'success',
            message : "Email Sent Successfully"});
   }catch(err){
    res.status(500).render("email-index", {
        status : 'error',
        message : "error, Email not sent, please try again "});
   }
})

//start server
app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`); 
})
