const { default: mongoose } = require("mongoose");
const userModel = require("./user.model")
exports.getAll = async(req,res) => {
    const user = await userModel.find({}).lean();
    return res.json(user)    
}
exports.create =async (req,res)=>{
    try {
        const {
          firstName,
          lastName,
          username,
          password,
          email,
          phoneNumber,
          role,
        } = req.body;
        const user = await userModel.create({
          firstName,
          lastName,
          username,
          password,
          email,
          phoneNumber,
          role,
        });
        console.log(user);
    
        return res.json(user);
      } catch (error) {
        return res.json({ error: error });
      }
}

exports.getOne= async (req, res) => {
    try {
        const {id} = req.params
        if (mongoose.Types.ObjectId.isValid(id)) {
            const user = await userModel.findOne({_id : id})
    
            if (user) {
                return res.json(user)
            }
            return res.json({
                message : "user not found"
            })
    
        }
        return res.json({
            message :"id not valid"
        })
    } catch (error) {
        throw new Error(error)
    }
}
exports.update = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            username,
            password,
            email,
            phoneNumber,
            role,
          } = req.body;
          const {id} = req.params
    
          if (mongoose.Types.ObjectId.isValid(id)) {
            const user = await userModel.findOneAndUpdate({_id : id},{
                firstName,
                lastName,
                username,
                password,
                email,
                phoneNumber,
                role
            })
            if (user) {
                return res.json(user)
            }
            return res.json({
                message : "user not found"
            })
          }
          return res.json({
            message : "id not valid"
          })
    } catch (error) {
        throw new Error(error)
    }
}
exports.remove = async (req, res) => {
    const {id} = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
        const user = await userModel.findOneAndDelete({_id : id})
        if (user) {
        return res.json(user)
        }
        return res.json({
            message : "user not found"
        })
    }
    return res.json({
        message :"id not valid"
    })
}