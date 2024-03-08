const express = require('express');
const app = express();
const port = 3001;
const morgan = require('morgan');
const cors = require("cors");
app.use(cors());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use("/api/addresses", require("./routes/addressRoutes"));
app.use(morgan("dev"))