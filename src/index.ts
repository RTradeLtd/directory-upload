import ipfsapi from "ipfs-http-client";

let jwt: string = process.env.TEMPORAL_JWT;
let directory: string = process.env.DIRECTORY;

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
        authorization: 'Bearer ' + jwt
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