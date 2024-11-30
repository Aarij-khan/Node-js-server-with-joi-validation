import express from "express";
import Joi from "joi";
const app = express();
const PORT = 3000;

// validation schema
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});



app.use(express.json());
var user = [];
app.get("/users", (req, res) => {
  res.send(user);
});
app.delete("/users/:id", (req, res) => {
  try {
    const {id} = req.params;
    const index = user.findIndex((user) => user.id === id);
    user.splice(index, 1);
    res.send(user);
  } catch (error) {
    res.send(error.message);
    
  }

});
app.post("/users", async (req, res) => {
  try {
    console.log("🚀 ~ app.post ~ req:", req.body)
    await schema.validateAsync(req.body);
    user.push({...req.body,id: Date.now().toString(36)});
    res.send({user:req.body,message : 'data recieved'});
  } catch (error) {
    res.send(error.details[0].message);
  }
 
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});