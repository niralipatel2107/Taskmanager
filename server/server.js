const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Team Issue tracker backend is running")
});

app.get("api/health",(req,res)=>{
    res.json({
        message: "api is healthy",
        status:"OK"
    })
})

app.listen(PORT,()=>{
    console.log(`server is running on port${PORT}`)
})