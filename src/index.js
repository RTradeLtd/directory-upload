"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var temporal_js_1 = __importDefault(require("temporal-js"));
var temporaljs = new temporal_js_1["default"](false);
var jwt = process.env.TEMPORAL_JWT;
var args = process.argv.slice(2);
var directory;
var user;
var pass;
if (args.length < 6) {
    console.log("error: invalid number of arguments");
    console.log("example: node index.js --dir ... --user ... --pass ...");
    process.exit();
}
for (var i = 0; i < args.length; i++) {
    switch (args[i]) {
        case "--dir":
            directory = args[i + 1];
        case "--user":
            user = args[i + 1];
        case "--pass":
            pass = args[i + 1];
    }
}
temporaljs.login(user, pass)
    .then(function () {
    temporaljs.uploadDirectory(directory, 1);
})["catch"](function (err) {
    console.error(err);
    process.exit();
});
