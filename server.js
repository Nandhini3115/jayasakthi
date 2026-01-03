const cors = require("cors");

const express = require("express");
require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const PORT= 3000;
app.use(express.json());
const bookRoutes=require('./routes/bookRoutes');

// Connect routes
app.use("/books",bookRoutes);
app.get('/',(req,res)=>{
    res.send('Library management API is running');
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
