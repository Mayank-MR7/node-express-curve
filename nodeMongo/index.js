const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

//Connection
mongoose.connect('mongodb://127.0.0.1:27017/nodeLesson1')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log(err.message));

app.use(express.json());

//Schema

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String
    },
    gender:{
        type:String,
    }
});

//Model
const User = mongoose.model('user', userSchema);


//POST API
app.post ('/api/users', async (req, res) => {
    try{
        const user  = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            jobTitle: req.body.jobTitle,
            gender: req.body.gender
        })
        const savedUser = await user.save();
        res.status(201).json({
            success: true,
            message: "User Info Submitted Successfully!!!",
            user : savedUser
        })
    }catch(error){
        if(error.name === 'ValidationError'){
            res.status(400).json({
                success: false,
                error: error.message
            });
        }else if (error.code === 11000){
            res.status(400).json({
                success: false,
                error: "Email already exist"
            })
        }else{
            console.error("Server errror :", error)
            res.status(500).json({
                success: false,
                error: "Internal Server Error"
            })
        }
    }
})

//GET ALL USERS
app.get('/api/users', async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            count: users.length,
            users: users
        })
    }catch (error) {
        console.error("Server error:", error);
        res.status(500).json({
            success: true,
            error: "Internal Server Error"
        })
        
    }
})

//GET USER BY ID
app.get('/api/users/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                success: false,
                error : "User Not Found"
            })
        }
        res.status(200).json({
            success: true,
            user: user
        })
    }catch (error) {
        if(error.kind === 'ObjectId'){
            return res.status(400).json({
                success: false,
                error: "Invalid User ID"
            })
        }
        console.error("Server error: ", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
})


//UPDATE USER
app.put('/api/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                jobTitle: req.body.jobTitle,
                gender: req.body.gender,
            },
            {new : true, runValidators: true}
        );
        if(!user){
            return res.json({
                success: false,
                error: "User Not Found"
            })
        }

        res.status(200).json({
            success: true,
            user: user,
            message: "User Updated Successfully"
        });
    }catch(error){
        if(error.name === "ValidationError" ){
            res.status(400).json({
                success: false,
                error: error.message
            });
        }else if(error.code === 11000){
            res.status(400).json({
                success: false,
                error: "Email Alreday Exist"
            });
        }else if(error.kind === "ObjectId"){
            res.status(400).json({
                success: false,
                error: "Invalid User ID"
            })
        }else{
            console.log('Server error', error);
            
            res.status(500).json({
                success: false,
                error: "Internal Server Error"
            })
        }
    }
});


//DELETE USER
app.delete('/api/users/:id', async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({
                success: false,
                error: "User Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            user: user
        });
    }catch(error){
        if(error.kind === "ObjectId"){
            return res.status(400).json({
                success: false,
                error: "Invalid User ID"
            });
        }
        console.log('Server error:', error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
        
    }
})

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
});