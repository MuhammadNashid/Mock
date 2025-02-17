import userSchema from './models/user.js'
import expenseSchema from './models/expense.js'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const {sign} =pkg


  export async function adduser(req, res) {
    const { username, email, pass, cpass } = req.body
    const user = await userSchema.findOne({ email })
    if (!user) {
      if (!(username && email && pass && cpass))
        return res.status(500).send({ msg: "fields are empty" })
      if (pass != cpass) return res.status(500).send({ msg: "pass not match" })
      bcrypt
        .hash(pass, 10)
        .then((hpass) => {
          userSchema.create({ username, email, pass: hpass })
          res.status(201).send({ msg: "Successfull" })
        })
        .catch((error) => {
          console.log(error)
        });
    } else {
      res.status(500).send({ msg: "email already used " })
    }
  }
  
  export async function login(req, res) {
    const { email, pass } = req.body
    if (!(email && pass))
      return res.status(500).send({ msg: "fields are empty" })
    const user = await userSchema.findOne({ email })
    if (!user) return res.status(500).send({ msg: "email do not exist" })
    const success = await bcrypt.compare(pass, user.pass)
    if (success !== true)
      return res.status(500).send({ msg: "email or password not exist" })
    const token = await sign({ UserID: user._id }, process.env.jwt_key, {expiresIn: "24h",})
    res.status(201).send({ token })
  }

export async function Home(req, res) {
const usr=await userSchema.findOne({_id:req.user.UserID})
console.log(usr);

res.status(200).send({name:usr.username}); 
}

export async function getdata(req, res) {
    const usr = await userSchema.findOne({ _id: req.user.UserID })
    const data = await userDataSchema.findOne({ userId: req.user.UserID })
    if (!data) res.status(200).send({ usr })
    else {
      res.status(200).send({ usr, data })
    }
  }
  
  export async function adddata(req, res) {
      try {
        const { nickname, dob, note } = req.body
      await expenseSchema.create({userId:req.user.amount,billUrl,description,category,date})
        res.status(200).send({ message: "Data added successfully!" })
      } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Failed to add data. Please try again." })
      }
  }
    
  export async function editdata(req, res) {
      try {
        const { nickname, dob, note } = req.body
        const updatedData = await expenseSchema.updateOne({ userId: req.user.UserID },{ $set: { amount,billUrl,description,category,date} },)
        res.status(200).send({ message: "Data updated successfully!", data: updatedData })
      } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Failed to update data. Please try again." })
      }
  }  

  export async function deleteData(req,res){
    try{
        const post = await expenseSchema.deleteOne({_id: req.params.id});
    res.status(200).send({ msg: "data deleted successfully!" });
    }catch(error){
        res.status(500).send({ msg: "Failed to delete data. Try again later." });
    }
  }