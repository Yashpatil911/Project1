import User from "../models/user.model.js";
import  genToken from "../config/token.js";
import bcrypt from "bcryptjs";
export const signUp= async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        const existEmail= await User.findOne({email});
        if(existEmail){
            return res.status(400).json({message:"Email already exists!"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters long!"});
        }

        const hashedPassword= await bcrypt.hash(password,10);

        const user=await User.create({
            name,password:hashedPassword,email
        })

        const token = await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge: 1000*60*60*24*7, // 7 days
            sameSite: "strict",
            secure:false, // Set to true if using HTTPS
        })

        return res.status(201).json(user)

    } catch(error){
    return res.status(500).json({message:`sign up server error ${error}`})
    }
}

export const Login= async (req,res)=>{
    try{
        const {email,password}=req.body;

        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Email does not exists !"});
        }
        const isMatch =await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid password!"});
        }

        const token = await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge: 1000*60*60*24*7, // 7 days
            sameSite: "strict",
            secure:false, // Set to true if using HTTPS
        })

        return res.status(200).json(user)

    } catch(error){
    return res.status(500).json({message:`Login  error ${error}`})
    }
}

export const logOut=async (req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"Logged out successfully!"})
    }catch(error){
        return res.status(500).json({message:`Logout error ${error}`})
    }
}