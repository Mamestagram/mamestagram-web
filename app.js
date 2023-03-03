//created by mamestagram development team

const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
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



app.get("/", (req, res) => {
   res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.render("top.ejs");
});

app.get("/leaderboard/mode=:mode/relax=:flag", (req, res) => {
    let mode;
    if (req.params.flag === "1") {
        if (req.params.mode < 3) {
            mode = req.params.mode + 4;
        }
        else {
            mode = req.params.mode + 5;
        }
    }
    else {
        mode = req.params.mode;
    }
    connection.query(
        "SELECT RANK() OVER(ORDER BY pp DESC) ranking, country, name, acc, plays, pp, " +
        "xh_count + x_count AS 'SS', sh_count + s_count AS 'S', a_count AS 'A' " +
        "FROM users " +
        "JOIN stats " +
        "ON users.id = stats.id " +
        "WHERE mode = ? " +
        "AND NOT users.id = 1 " +
        "AND NOT acc = 0 " +
        "ORDER BY pp DESC;",
        [mode],
        (error, results) => {
            res.render("leaderboard.ejs", {rankings: results, mode: req.params.mode, flag: req.params.flag});
        }
    );
});

app.get("/help", (req, res) => {
    res.render("help.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.get("/login" ,(req, res) => {
    res.render("login.ejs");
});

app.listen(3000);
console.log("ready");
