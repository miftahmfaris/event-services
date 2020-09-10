const express = require("express");
const app = express();
const cors = require("cors");

const { db, PORT } = require("./config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to Rest API");
});

app.use("/members", require("./routes/member"));
app.use("/deposits", require("./routes/deposit"));

app.get("*", (req, res) => {
    res.send("404 Page Not Found");
});

if (db) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
