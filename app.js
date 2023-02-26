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

app.get("/leaderboard", (req, res) => {
    connection.query(
        "SELECT RANK() OVER(ORDER BY pp DESC) Ranking, country, name, acc, plays AS \"playcount\", pp, xh_count + sh_count AS \"SS\", x_count + s_count AS \"S\", a_count AS \"A\"" +
        "FROM users" +
        "JOIN stats" +
        "ON users.id = stats.id" +
        "WHERE mode = ?" +
        "AND NOT users.id = 1" +
        "ORDER BY pp DESC;",
        [0],
        (error, results) => {
            console.log(results);
            res.render("leaderboard.ejs")
        }
    )
});

app.listen(3000);
console.log("ready");
