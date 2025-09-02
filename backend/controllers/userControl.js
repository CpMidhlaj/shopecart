const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const fs = require("fs")
const users = [];
exports.getAllUsers = async (res,req)=>{
    try{
        const users = await User.find();
        if(!users){
            return res.status(404).json({
                success:false,
                message:"Users not found!",
            });
        }
          req.status(200).json({
        success:true,
        users,
    });
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message,
        });
    }
  
}
exports.userRegister = async (req,res)=>{

    console.log("req.body---->", req.body);
    try{
       const {fullName,email,password,gender,age} = req.body;

        // const hashedPassword = await bcrypt.hash(password,10);
        // // console.log("hashedpassword--->",hashedPassword);
        
        const userPhoto = req?.file?.path ?? null ;

        if(!fullName || !email || !password || !gender || !age){
            if(userPhoto){
                fs.unlinkSync(userPhoto);
            }
             res.status(400).json({
            success: false,
            message:"please fill all the field"
        })
        }

        const userData = {
            fullName,
            email,
            password,
            userPhoto,
            gender,
            age
        }


        const user= await User.create(userData);

        console.log("user--->",user);
        

        res.status(201).json({
            success:true,
            user,
            message:("user register successfully!")
        });
    }catch(error){
        fs.unlinkSync(req?.file?.path);
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
    
}
exports.userLogin = async (req,res)=>{
    try {

        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Users not found!",
            });
        }

        if(!user.status){
            return res.status(401).json({
                success:false,
                message:"Users is inactive!",
            });
        }

       const isMatched = await bcrypt.compare(password, user.password);
       console.log("isMatched---->",isMatched);
       
       if(!isMatched){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials!"
            })
       }

       const option = {
        userId:user._id,
        userRole:user.role,
       }

       const token = jwt.sign(option,process.env.JWT_SECRET_KEY,{expiresIn:'30m'})

       res.status(200).cookie('token',token).json({
            success:true,
            message:"User Logged Successefully!",
            user
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
exports.userProfileUpdate = async (req,res)=>{

    try {
        const {fullName,email,password} = req.body;

        const user = await User.findById(req.userId);

        if(!user){
              return res.status(404).json({
                success:false,
                message:"Users not found!",
            });
        }

        if(fullName) user.fullName = fullName;

        if(email) user.email = email;

        if(password) user.password = password;

        const updatedUser = await user.save();

            res.status(200).json({
            success:true,
            message:"user user profile updated successfully!",
            user:updatedUser
        });


    } catch (error) {
         res.status(500).json({
            success:false,
            message:error.message,
        })
    }
  
}
exports.userProfileDelete = async (req,res)=>{

    try {

        const user = await User.findByIdAndDelete(req.userId);

        if(!user){
              return res.status(404).json({
                success:false,
                message:"Users not found!",
            });
        }


            res.status(200).json({
            success:true,
            message:"user  profile deleted successfully!",
            user
        });


    } catch (error) {
         res.status(500).json({
            success:false,
            message:error.message,
        })
    }
  
}
exports.updateUserRole = async (req,res)=>{
    try {
        const {id} = req.params;
        const {role} = req.body;

        const user = await User.findById(id).select('-password');
        

        if(!user){
             return res.status(404).json({
                success:false,
                message:"Users not found!",
            });
        }
        user.role = role;

        const updatedUser = await user.save();
         res.status(200).json({
            success:true,
            message:"user role updated successfully!",
            user:updatedUser
        });

    } catch (error) {
         res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
exports.updateUserStatus = async (req,res)=>{
    try {
        const {id} = req.params;

        const user = await User.findById(id).select('-password');
        

        if(!user){
             return res.status(404).json({
                success:false,
                message:"Users not found!",
            });
        }
        user.status = !user.status;

        const updatedUser = await user.save();
         res.status(200).json({
            success:true,
            message:"user status updated successfully!",
            user:updatedUser
        });

    } catch (error) {
         res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
exports.deletedUserByAdmin = async (req,res)=>{
    try {
        const {id} = req.params;

        const user = await User.findByIdAndDelete(id).select('-password');
        

        if(!user){
             return res.status(404).json({
                success:false,
                message:"Users not found!",
            });
        }
     
         res.status(200).json({
            success:true,
            message:"user profil deleted successfully!",
            user
        });

    } catch (error) {
         res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
exports.userLogout = (req,res)=>{
    res.status(200).clearCookie('token').json({
        success:true,
        message:"Logged Out Successfully!"
        });
}