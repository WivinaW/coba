const express = require("express");
const app = express();
const account = require("./routes/account");

app.use("/api/account", account);


app.listen(3000, function() {
    console.log("I love you 3000...");
});