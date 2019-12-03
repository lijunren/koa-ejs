module.exports = (server) => {
    server.use(handle);
}

async function handle(cxt, next) {
    try{
        await next();
    }catch(e){
        console.log(e,"错误！！！");
    }
}