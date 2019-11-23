import Temporal from "temporal-js";

let temporaljs = new Temporal(false);
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
     temporaljs.uploadDirectory(directory, 1)
 })
 .catch((err) => {
     console.error(err);
     process.exit();
 })

 