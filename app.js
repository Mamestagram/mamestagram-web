//created by mamestagram development team

const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(
    session({
        secret: "my_secret_key",
        resave: false,
        saveUninitialized: false,
    })
)

const connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

app.get("/", (req, res) => {
    res.render("top.ejs");
});

app.get("/rankings", (req, res) => {
    res.render("rankings.ejs");
});

app.get("/community", (req, res) => {
    res.render("community.ejs");
});

app.listen(3000);
console.log("ready");
