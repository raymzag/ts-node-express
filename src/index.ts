// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from 'axios';

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
const port = process.env.PORT || 3000;

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
  // res.send("Express + TypeScript Server");
  res.sendFile(__dirname + "/payment.html");
});

app.post("/create-charge", (req: Request, res: Response) => {
  axios.post("https://test-api.pinpayments.com/1/charges", {
    amount: req.body.charge.amount,
    email: "roland@pinpayments.com",
    description: "test charge",
    ip_address: "127.0.0.1",
    card_token: req.body.card_token,
  }, {
    auth: {
      // Enter secret api Key
      username: "Your secret api key",
      password: ""
    }
  })
  .then(function (response) {
    console.log(response.data);
    res.send(response.data);
  })
  .catch(function (error) {
    console.log(error.response);
    res.send(error.response.data);
  });
});

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
