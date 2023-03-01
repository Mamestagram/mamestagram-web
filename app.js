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
    res.render("top.ejs");
});

app.get("/leaderboard", (req, res) => {
    connection.query(
        "SELECT RANK() OVER(ORDER BY pp DESC) ranking, country, name, acc, plays, pp, xh_count + x_count AS \"SS\", sh_count + s_count AS \"S\", a_count AS \"A\"\n" +
        "FROM users\n" +
        "JOIN stats\n" +
        "ON users.id = stats.id\n" +
        "WHERE mode = 0\n" +
        "AND NOT users.id = 1\n" +
        "ORDER BY pp DESC;",
        (error, results) => {
            res.render("leaderboard.ejs", {rankings: results});
        }
    );
});

app.listen(3000);
console.log("ready");
