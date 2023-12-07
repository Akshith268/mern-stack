const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());



const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://akshith:1WRzwPw3fzuqPucv@cluster0.lb5yk0y.mongodb.net/?retryWrites=true&w=majority",  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB connection error", err);
});

const User = require('./models/user.model');
const tailorData = require('./models/tailor.model');
const db=mongoose.connection;


const R = 6371; 

function calculateDistance(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}






app.post('/api/register', async(req, res) => {
    const { name, email, password, confirmpassword } = req.body;
    if(!name || !email || !password || !confirmpassword){
        return res.status(422).json({error:"Please fill all the fields"});
    }

    if(password != confirmpassword){
        return res.status(422).json({error:"Password and Confirm Password does not match"});
    }
    else
    {
    
    try{
         const user= await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        });
       return res.json({status:"success", message:"User registered successfully"});
        
    }
    catch(err){
        console.log(err);
       return res.json({status:"error", message:"Email already exists"});
    }
}
});


app.post('/api/login', async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please provide email and password" });
    }

    try {
        const user = await User.findOne({
            email: email,
        }).then((data) => {
            if (data.password === password) {
                return data;
            } else {
                return null;
            }
        });

       if(user)
       {
        return res.json({status:'ok'})
       }
       
    } catch (err) {
        console.log(err);
       return res.json({ status: "error", message: "Invalid Credent" });
    }
    
   
});

app.post('/api/tailorRegistration', async(req, res) => {
    const { name, email, location } = req.body;
    if(!name || !email || !location){
        return res.status(422).json({error:"Please fill all the fields"});
    }
    else
    {
    
    try{
         const tailor= await tailorData.create({
            name:req.body.name,
            email:req.body.email,
            location:req.body.location,
        });
       return res.json({status:"success", message:"Tailor registered successfully"});
        
    }
    catch(err){
        console.log(err);
       return res.json({status:"error", message:"Email already exists"});
    }
}
});


  app.get('/api/nearbyTailors', async(req, res) => {
    

    const { latitude, longitude } = req.query;
   

    try{
        const tailors=await tailorData.find();

        const nearbyTailors = tailors.filter((tailor) => {
            const distance = calculateDistance(
              parseFloat(latitude),
              parseFloat(longitude),
              parseFloat(tailor.location.latitude),
              parseFloat(tailor.location.longitude)
            );
            return distance <= 5; 
          });
          return res.json({ status: 'success', data: nearbyTailors });
    }
    catch(err){
        console.log(err);
       return res.json({status:"error", message:"Email already exists"});
    }
   
});






app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
