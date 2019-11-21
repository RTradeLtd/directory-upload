import ipfsapi from "ipfs-http-client";
import Temporal from "./temporal-js";

let temporaljs = new Temporal();
let jwt: string = process.env.TEMPORAL_JWT;
let args: string[] = process.argv.slice(2);
let directory: string;
let user: string;
let pass: string;

if (args.length < 6) {
    console.log("error: invalid number of arguments");
    console.log("example: node index.js --dir ... --user ... --pass ...")
    process.exit();
}
for (var i = 0; i < args.length; i++) {
    switch (args[i]) {
        case "--dir":
            directory = args[i+1]       
        case "--user":
            user = args[i+1]
        case "--pass":
            pass = args[i+1]
    }
}

temporaljs.login(user, pass)
 .then(() => {
     let token: string = temporaljs.token;
     if (token == "") {
         console.error("no token");
         process.exit();
     }
     let api = ipfsapi({
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
    
    api.addFromFs(directory, { recursive: true },  function (err, response) {
        if (err) {
            console.error(err, err.stack)
        } else {
            response.forEach(element => {
                if (element.path == directory) {
                    console.log("root directory hash: ", element.hash);
                }
            });
        }
    })
 })
 .catch((err) => {
     console.error(err);
     process.exit();
 })

 