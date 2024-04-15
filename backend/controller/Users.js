import Users from "../models/UserModel.js"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"

export const getUsers = async(req, res) => {
    try{
        const users = await Users.findAll({
            attributes : ['id', 'name', 'email']
        })
        res.json(users)
    }
    catch (error){
        console.log(error)
    }
}

export const Register = async(req, res) => {
    const {name, email, password, confPassword} = req.body

    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm not match."})
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        })
        res.json({msg: "User Registered"})
    } catch (error) {
        console.log(error)   
    }
}


export const Login = async(req, res)=>{
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if (!match) return res.status(400).json({msg: "Wrong Password"})

        const userID = user[0].id
        const userName = user[0].name
        const userEmail = user[0].email
        const accessToken = jwt.sign({userID,userName, userEmail}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '15s'
        })

        const refreshToken = jwt.sign({userID,userName, userEmail}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn : '1d'
        })

        await Users.update({refreshToken: refreshToken}, {
            where:{
                id: userID
            }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            //secure : true
        })

        res.json({accessToken});

    } catch (error) {
        res.status(404).json({msg: "User Not Found"})
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204); //no content
    const user = await Users.findAll({
        where: {
            refreshToken: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(404); //no content
    const userID = user[0].id;
    await Users.update({refreshToken: null}, {
        where:{
            id: userID
        }
    })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}