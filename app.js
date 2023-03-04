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

app.get("/leaderboard/mode=:mode/special=:sp", (req, res) => {
    let mode_num;
    if (req.params.sp === "none") {
        switch (req.params.mode) {
            case "std":
                mode_num = 0;
                break;
            case "taiko":
                mode_num = 1;
                break;
            case "ctb":
                mode_num = 2;
                break;
            case "mania":
                mode_num = 3;
                break;
        }
    }
    else if (req.params.sp === "rx") {
        switch (req.params.mode) {
            case "std":
                mode_num = 4;
                break;
            case "taiko":
                mode_num = 5;
                break;
            case "ctb":
                mode_num = 6;
                break;
        }
    }
    else if (req.params.sp === "ap") {
        mode_num = 8;
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
        [mode_num],
        (error, results) => {
            res.render("leaderboard.ejs", {rankings: results, mode: req.params.mode, sp: req.params.sp});
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

app.get("/profile/id=:id/mode=:mode/special=:sp", (req, res) => {
    res.render("profile.ejs");
});

app.listen(3000);
console.log("ready");
