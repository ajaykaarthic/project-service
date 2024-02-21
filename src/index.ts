import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import http from "http";
import router from "./router";

// Creating an Express application instance
const app = express();

app.use(
  cors({
    credentials: true,
    origin: `http://localhost:3000`,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Creating and starting an HTTP server using Express app instance
const server = http.createServer(app);

server.listen(3001, () => {
  console.log("server started on http://localhost:/3001");
});

app.use("/", router());
