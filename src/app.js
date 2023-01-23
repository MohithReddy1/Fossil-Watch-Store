const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/connect");
const Register = require("./models/register");

const port = process.env.PORT || 3001;

let name;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const images_path = path.join(__dirname, "../public/images");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path); 
hbs.registerPartials(partials_path);
app.use(express.static(images_path));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/index", (req, res) => {
    res.render("index");
});

// app.get("/signup", (req, res) => {
//     res.render("signup");
// });

app.get("/signup", (req, res) => {
    res.render("signup", {error:1});
});

app.get("/signin", (req, res) => {
    res.render("signin", {error:1});
});

app.get("/after_login", (req, res) => {
    res.render("after_login", {user:name});
});

app.get("/analog_watches", (req, res) => {
    res.render("analog_watches", {user:name});
});

app.get("/mens_analog", (req, res) => {
    res.render("mens_analog", {user:name});
});

app.get("/womens_analog", (req, res) => {
    res.render("womens_analog", {user:name});
});

app.get("/smart_watches", (req, res) => {
    res.render("smart_watches", {user:name});
});

app.get("/mens_smart", (req, res) => {
    res.render("mens_smart", {user:name});
});

app.get("/womens_smart", (req, res) => {
    res.render("womens_smart", {user:name});
});

app.get("/orders", (req, res) => {
    res.render("orders", {user:name});
});

app.get("/cart", (req, res) => {
    res.render("cart", {user:name});
});

app.use(express.urlencoded({extended:true}));

app.post("/signup", async (req, res) => {
    
    try{
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if (password === confirmpassword){
            const userrecord = new Register({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            });
            
            const userstatus = await userrecord.save();
            res.redirect("signin");

        }else{
            res.render("signup", {error:0}); 
            // res.send("Password are not matching");
            // alert("Password are not matching");
        }

    } catch (error) {
        res.status(400).send(error);
    }

});

// function(error){
//     if(error.responseText == 'showAlert')
//         alert("Please enter correct user name and password.")

// }

//login validation

// let useremail;
// let name;

app.post("/signin", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = await Register.findOne({email:email});
        name = useremail.username;
        
        if(useremail.password === password){
            res.status(201).render("after_login",{user:name});
        }else{
            // res.send("Invalid Email/ Password");
            res.render("signin", {error:0});
        }

    } catch (error) {
        // res.status(400).send("Invalid Email/ Password");
        res.status(400).render("signin", {error:0});
    }
});

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});

