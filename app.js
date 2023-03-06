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



const getModeNum = (sp, mode) => {
    if (sp === "none") {
        switch (mode) {
            case "std":
                return 0;
            case "taiko":
                return 1;
            case "ctb":
                return 2;
            case "mania":
                return 3;
        }
    }
    else if (sp === "rx") {
        switch (mode) {
            case "std":
                return 4;
            case "taiko":
                return 5;
            case "ctb":
                return 6;
        }
    }
    else if (sp === "ap") {
        return 8;
    }
}

app.get("/", (req, res) => {
   res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.render("top.ejs");
});

app.get("/leaderboard/mode=:mode/special=:sp", (req, res) => {
    let mode_num;
    mode_num = getModeNum(req.params.sp, req.params.mode);
    connection.query(
        "SELECT users.id AS 'id', RANK() OVER(ORDER BY pp DESC) ranking, country, name, acc, plays, pp, " +
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
    let mode_num;
    const query = new Array(4);
    mode_num = getModeNum(req.params.sp, req.params.mode);
    connection.query(
        "SELECT name, " +
        "(SELECT COUNT(*) + 1 " +
        "  FROM stats " +
        "  WHERE pp > (" +
        "      SELECT pp " +
        "      FROM stats " +
        "      WHERE id = ? " +
        "      AND mode = ?)" +
        "  AND mode = ?) AS 'GRanking', " +
        "(SELECT COUNT(*) + 1 " +
        "  FROM stats " +
        "  WHERE pp > ( " +
        "      SELECT pp " +
        "      FROM stats " +
        "      WHERE id = ? " +
        "      AND mode = ?)" +
        "  AND mode = ?) AS 'CRanking', " +
        "acc, plays, total_hits, rscore, tscore, replay_views, pp, playtime " +
        "FROM stats " +
        "JOIN users " +
        "ON stats.id = users.id " +
        "WHERE users.id = ? " +
        "AND mode = ?;",
        [req.params.id, mode_num, mode_num, req.params.id, mode_num, mode_num, req.params.id, mode_num],
        (error, results) => {
            query[0] = results[0];
        }
    );
    connection.query(
        "SELECT grade, title, artist, mods, acc, pp " +
        "FROM scores " +
        "JOIN maps " +
        "ON map_md5 = md5 " +
        "WHERE userid = ? " +
        "AND scores.mode = ? " +
        "AND NOT grade = 'F' " +
        "ORDER BY pp DESC " +
        "LIMIT 100;",
        [req.params.id, mode_num],
        (error, results) => {
            query[1] = results;
        }
    );
    connection.query(
        "SELECT title, artist, creator, maps.mode, COUNT(*) AS 'playtimes' " +
        "FROM scores " +
        "JOIN maps " +
        "ON map_md5 = md5 " +
        "WHERE userid = ? " +
        "GROUP BY map_md5 " +
        "ORDER BY playtimes DESC;",
        [req.params.id],
        (error, results) => {
            query[2] = results;
        }
    );
    connection.query(
        "SELECT grade, title, artist, scores.mode, mods, acc, pp " +
        "FROM scores " +
        "JOIN maps " +
        "ON map_md5 = md5 " +
        "WHERE userid = ? " +
        "AND TIMEDIFF(CURRENT_TIMESTAMP(), play_time) <= '24:00:00' " +
        "AND NOT grade = 'F' " +
        "ORDER BY play_time DESC;",
        [req.params.id],
        (error, results) => {
            query[3] = results;
            res.render("profile.ejs", {info: query[0], bestpp: query[1],
                bestplaytimes: query[2], recentplays: query[3]});
        }
    );
});

app.listen(3000);
console.log("ready");
