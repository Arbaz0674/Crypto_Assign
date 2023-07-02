const express = require("express");
const cors = require("cors");

//Database Connection
const connectToDatabase = require("./database");
connectToDatabase();

//Routes
const exchangeRoutes = require("./routes/exchangeRoute");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.use("/", exchangeRoutes);
app.listen(port, () => {
  console.log(`Server is Listening at Port ${port}`);
});
