const express = require('express');
const app = express();
const port = 3001;
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require("cors");
app.use(cors());
connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use("/api/addresses", require("./routes/addressRoutes"));
app.use(morgan("dev"))