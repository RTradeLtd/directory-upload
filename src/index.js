"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
var jwt = process.env.TEMPORAL_JWT;
var directory = process.env.DIRECTORY;
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
        authorization: 'Bearer ' + jwt
    }
});
api.addFromFs(directory, { recursive: true }, function (err, response) {
    if (err) {
        console.error(err, err.stack);
    }
    else {
        response.forEach(function (element) {
            if (element.path == directory) {
                console.log("root directory hash: ", element.hash);
            }
        });
    }
});
