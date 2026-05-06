const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
console.log("DEBUG: DB_URL is ->", process.env.DB_URL);

const express=require("express");
const app =express();
const cors = require("cors");
const db = require("./db")
const jwt = require("jsonwebtoken");
const port = 5000;
const bcrypt=require("bcrypt");

app.use(cors())
app.use(express.json())
app.post('/register',async(req,res)=>{
const name = req.body.username||"";
const pass=req.body.pass||"";
if(name.trim()===""||pass.trim()==="")
{
	return res.json({
		login:false,
		error:"cannot pass empty string"
});
}
else
{
	const hashedPassword = await bcrypt.hash(pass, 10);
	const isInsert=await db.postData(name,hashedPassword);
	if (isInsert){
	return res.json({
		login:true,
		
	});
}
else{
	return res.json({
		login:false,
		error:"username already exist please use another"
	});
}
}
});
app.post('/auth',async(req,res)=>{
    const username=req.body.username||"";
    const pass=req.body.pass||"";
    if (username.trim()===""||pass.trim()==="")
    {
       return res.json({
            login:false,
            error:"cannot pass empty strings"
        });
    }
    const tuple=await db.getData(username);
    if(tuple&&tuple.length>0)
    {
		const isMatch = await bcrypt.compare(pass, tuple[0].password);
		if(isMatch){
        const token = jwt.sign(tuple[0], process.env.JWT_SECRET);
       return res.json({
			login: true,
			token: token,
			data: tuple,
		});
	}
	else {
            // They typed the wrong password
            return res.json({
                login: false,
                error: "Incorrect password.",
            });
    }
}
    else {
		return res.json({
			login: false,
			error: "please check name and password.",
		});
	}

});
app.post("/verifyToken", (req, res) => {
	const token = req.body.token;
	if (token) {
		const decode = jwt.verify(token, process.env.JWT_SECRET);
		return res.json({
			login: true,
			data: decode,
		});
	}
     else {
		return res.json({
			login: false,
			data: "error",
		});
	}
});
app.listen(port, () => {
	console.log(`Server is running : 
	http://localhost:${port}/`);
});
