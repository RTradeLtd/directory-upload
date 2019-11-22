"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
var temporal_js_1 = __importDefault(require("./temporal-js"));
var temporaljs = new temporal_js_1["default"]();
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
    var token = temporaljs.token;
    if (token == "") {
        console.error("no token");
        process.exit();
    }
    var api = ipfs_http_client_1["default"]({
        // the hostname (or ip address) of the endpoint providing the ipfs api
        host: 'api.ipfs.temporal.cloud',
        // the port to connect on
        port: '443',
        'api-path': '/api/v0/',
        // the protocol, https for security
        protocol: 'https',
        // provide the jwt within an authorization header
        headers: {
            authorization: 'Bearer ' + token
        }
    });
    api.addFromFs(directory, { recursive: true }, function (err, response) {
        if (err) {
            console.error(err, err.stack);
        }
        else {
            response.forEach(function (element) {
                if (directory.includes(element.path)) {
                    console.log("root directory hash: ", element.hash);
                }
            });
        }
    });
})["catch"](function (err) {
    console.error(err);
    process.exit();
});
