const contactsModel = require("./contact.model");
const nodemailer = require("nodemailer")

exports.create = async (req, res) => {
    const {name, email, phone, body} = req.body;
  const contact = await contactsModel.create({
    name,
    email,
    phone,
    body,
    isAnswer : 0,
  });

  return res.json(contact);
};

exports.getAll = async (req, res) => {
    const contact = await contactsModel.find({}).lean();
    return res.json(contact);
};

exports.remove = async (req, res) => {
    const {id} = req.params
    const contact = await contactsModel.findOneAndDelete({_id : id})
    if (!contact){
        return res.json({
            message : "contact not found"
        })
    }
    return res.json(contact);
};

exports.answer = async (req, res) =>  {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: "amirmahdi.kian003@gmail.com",
            pass: "rxus qacj nnzq aaxb"
        }
    })

    const mailOptions = {
        from: "amirmahdi.kian003@gmail.com",
        to : req.body.email,
        subject : "پاسخ به درخواست شما ",
        text : req.body.answer 
    }

    transporter.sendMail(mailOptions, async (err , info)=>{
        if (err){
            return res.json({message : err})
        }else{
            const contact = await contactsModel.findOneAndUpdate({email: req.body.email},{
                isAnswer : 1
            })
            return res.json({message : "email send successfully "})
        }
    })
}