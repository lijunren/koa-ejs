const Mysql = require("mysql-pro");
const config = require("../config");
const db = new Mysql({
    mysql: {
        host: config.db_host,
        port: config.db_port,
        user: config.db_user,
        password: config.db_pass,
        database: config.db_name
    }
});
db.execute = async sql => {
    let result;
    await db.startTransaction();
    if (typeof sql === "string") {
        result = await db.executeTransaction(sql);
    } else {
        sql.forEach(async (item) => {
            result = await db.executeTransaction(item);
        });
    }
    await db.stopTransaction();
    return result;
}
module.exports = db;

