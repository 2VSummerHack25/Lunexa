import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello D'Angelo");
});

app.get("/user", (req, res) => {
    res.send("Hello Jesse");
} )

app.post("/user/test", (req, res) => {
    const name = req.query.name;
    const age = req.query.age;
    res.send("Hello " + name + " you are " + age + " years old");
    
} )



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});