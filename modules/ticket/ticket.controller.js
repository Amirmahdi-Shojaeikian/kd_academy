const  ticketModel = require("./ticket.model")
const  userModel = require("./../user/user.model")
const  departmentModel = require("./../department/department.model")
const  subDepartmentModel = require("./../sub_department/sub_department.model")
//create ticket
exports.create = async (req, res) => {
    const { departmentID, subDepartmentID, priority, title, body, product } = req.body;
    const user = await userModel.findOne({email : req.email})
    const ticketCreate = await ticketModel.create({
      departmentID,
      subDepartmentID,
      priority,
      title,
      body,
      user: user._id ,
      answer: 0,
      product,
      isAnswer: 0,
    });
    const findTicket = await ticketModel
      .findOne({ _id: ticketCreate._id })
      .populate("departmentID" , "title")
      .populate("subDepartmentID", "title")
      .populate("user" , "name")
      .lean();
  
    return res.status(201).json(findTicket);
};
//getAll ticket
exports.getAll = async (req, res) => {
    const allTicket = await ticketModel.find({ answer : 0 })
    .populate("departmentID" , "title")
    .populate("subDepartmentID", "title")
    .populate("user" , "name")
    .lean()

    return res.json(allTicket)
};
//create department
exports.createDepartment = async (req, res) => {
    try {
        const {department} = req.body
        const createDepartment = await departmentModel.create({title : department})
        return res.status(201).json(createDepartment)
    } catch (error) {
        throw new Error(error)
    }
};
//create subDepartment
exports.createSubDepartment = async (req, res) => {
    const {Subdepartment} = req.body
    console.log(Subdepartment);
    const {id} = req.params
    console.log(id);
    const createSubDepartment = await subDepartmentModel.create({title : Subdepartment , parent:id })
    return res.status(201).json(createSubDepartment)
};
//getAll department
exports.getAllDepartment = async (req, res) => {
    const department = await departmentModel.find({});
    return res.json(department);
};
//get subDepartment
exports.getSubDepartment = async (req, res) => {
    const { id } = req.params;
    const departmentSub = await subDepartmentModel.find({parent : id });
    return res.json(departmentSub);
};

//getAll users tickets
exports.userTicket = async (req, res) => {
    const user = await userModel.findOne({email : req.email})
    const usersTicket = await ticketModel.find({user: user._id})
    .sort({_id : -1})
    .populate("departmentID" , "title")
    .populate("subDepartmentID", "title")
    .populate("user" , "name")
    .lean();
    return res.json(usersTicket);
};
//set answer 
exports.setAnswer = async (req,res) => {
    const {body , ticketId} = req.body
    const user = await userModel.findOne({email : req.email})
    const ticket = await ticketModel.findOne({_id : ticketId})
    const answer = await ticketModel.create({
      departmentID : ticket.departmentID,
      subDepartmentID : ticket.subDepartmentID,
      priority: ticket.priority,
      title : "پاسخ به تیکت شما",
      body,
      user: user._id ,
      answer: 0,
      parent : ticket._id ,
      isAnswer: 1,
    })
    const updateTicket = await ticketModel.findOneAndUpdate({_id : ticket._id},{
        answer : 1
    })
    return res.json(answer)
}
//get answer 
exports.getAnswer = async (req,res) => {
    const {id} = req.params
    const ticket = await ticketModel.findOne({_id : id})
    const answerTicket = await ticketModel.findOne({parent : id})
  
    return res.json({ticket ,answerTicket: answerTicket ? answerTicket : null})
}
