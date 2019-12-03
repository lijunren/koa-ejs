const pathlib = require("path");
module.exports={
    //base
    port: 8089,
    uploadDir: pathlib.resolve("www/upload"),
    wwwDir: pathlib.resolve("www"),
    ejsRoot: pathlib.resolve("template"),
    // log
    logPath: pathlib.resolve("log/access.log"),
    // secret
    secret:["k839ksdkaflk003umc02","lkkdsLjjda038dkdsf"],
    // database
    db_host: "127.0.0.1",
    db_port: 3306,
    db_user: "root",
    db_pass: "",
    db_name: "zhihu"
}