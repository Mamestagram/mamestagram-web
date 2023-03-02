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

const connection = mysql.createConnection({
    host: "localhost",
    user: "mamestagram",
    password: "meronsan00",
    database: "private"
});

app.get("/home", (req, res) => {
    res.render("top.ejs");
});

app.get("/leaderboard/mode=:id", (req, res) => {
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
        [req.params.id],
        (error, results) => {
            res.render("leaderboard.ejs", {rankings: results});
        }
    );
});

app.listen(3000);
console.log("ready");
