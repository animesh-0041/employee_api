const express=require("express")
const { EmployeeModel } = require("../model/employee.model")

const emplyeRoute=express.Router()


//add
emplyeRoute.post("/add",async(req,res)=>{
    try {
        const employee= new EmployeeModel(req.body)
        await employee.save()
        res.send("Employee has been added")
        
    } catch (error) {
      res.send(error)  
    }
})

//get
emplyeRoute.get("/",async(req,res)=>{
    try {
        const employees= await EmployeeModel.find()
        res.send(employees)
        
    } catch (error) {
      res.send(error)  
    }
})



//delete
emplyeRoute.delete("/delete/:id",async(req,res)=>{
    let { id } = req.params;
    const emp=await EmployeeModel.findOne({_id:id})
    try {
        if(emp){
            await EmployeeModel.findByIdAndDelete({ _id: id });
          res.status(200).send({ "msg": `Data has been deleted` });
        }
        else{
            res.send({ "msg": `Employee not found` });
        }
          
            
        }
  
     catch (error) {
      res.status(404).send(error);
    }
})


//edit
emplyeRoute.patch("/edit/:id",async(req,res)=>{
    let { id } = req.params;
    const emp=await EmployeeModel.findOne({_id:id})
    try {
        if(emp){
            await EmployeeModel.findByIdAndUpdate({ _id: id },req.body);
          res.status(200).send({ "msg": `Data has been updated` });
        }
        else{
            res.send({ "msg": `Employee not found` });
        }
          
            
        }
  
     catch (error) {
      res.status(404).send(error);
    }
})


module.exports={
    emplyeRoute
}
