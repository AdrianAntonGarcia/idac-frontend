var path = require("path");
var express = require("express");
var app = express();
// const forceSSL = function () {
//     return function (req, res, next) {
//         if (req.headers["x-forwarded-proto"] !== "https") {
//             return res.redirect(
//                 ["https://", req.get("Host"), req.url].join("")
//             );
//         }
//         next();
//     };
// };
// app.use(forceSSL());
app.use(express.static(__dirname + "/dist/idac-frontend"));
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/idac-frontend/index.html"));
});
app.listen(process.env.PORT || 8080);
