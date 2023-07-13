const mongoose=require("mongoose")


const employeeSchema=mongoose.Schema({
    firstname:{type: String, required: true},
    lastname:{type: String, required: true},
    email:{type: String, required: true},
    date:{type:String},
    department :{type: String, required: true},
    salary:{type: Number, required: true}
})
const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports={
    EmployeeModel
}