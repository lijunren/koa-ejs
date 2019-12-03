const fs = require("fs");
const config = require("../config");

module.exports = async server => {
    server.use(async (cxt, next) => {
        await new Promise((resolve, reject) => {
            fs.appendFile(config.logPath,`[${Date.now()}] ${cxt.method} ${cxt.url}\r\n`, (err) => {
                resolve();
            });
        })
        await next();
        
    })
}