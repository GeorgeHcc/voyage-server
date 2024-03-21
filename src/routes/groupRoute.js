const groupRouter = require("express").Router();

const {createGroup} =require("../controllers/groupController")

groupRouter.post("/createGroup",createGroup)

module.exports=groupRouter