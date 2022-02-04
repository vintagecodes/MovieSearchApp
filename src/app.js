const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn");

const Register = require("./models/registers")

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));


app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/index", (res,req) =>{
    res.render("index")
});

app.get("/", (req, res) =>{
    res.render("register")
});

app.post("/register", async (req, res) =>{
    try{

       const registerEmployees = new Register({
           username: req.body.username,
           email: req.body.email,
           password: req.body.password
       })

       const register = await registerEmployees.save();
       res.status(201).render("register");

    }
    catch(error){
        res.status(400).send(error);
    }
})

app.get("/login", (req, res) =>{
    res.render("login")
});



app.post("/login", (req, res) =>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        if((username === Register.username)&&(password === Register.password)){
            console.log("success")
            res.redirect('/home')
        }

    }catch(error){
        res.status(400).send(error);
    }
})
app.get("/home", (req,res) =>{
    res.render("home")
});

app.listen(port, () =>{
    console.log(`Server is running at port number ${port}`);
})



