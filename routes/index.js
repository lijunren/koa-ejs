const Router = require("koa-router");
const Mysql = require("mysql-pro");
const app=new Router();
app.get("", async (cxt) => {
    const data = await cxt.db.execute(`
    select q.id,q.title,q.content,a.content as tallContent,author.name,author.headline from 
    question_table  as q
    left join answer_table as a
    on q.best_answer_ID=a.ID
	left join author_table as author
	on a.author_ID=author.ID
    limit 0,2;
    `);
    // console.log(data[0]);
    await cxt.render("index", {data});
});
app.get("detail/:id", async (cxt) => {
    // console.log(cxt.params);
    const {id} = cxt.params;
    const question = await cxt.db.execute(`
        SELECT * FROM 
        question_table
        WHERE ID = ${id}
    `);
    const answer = await cxt.db.execute(`
        SELECT * FROM 
        answer_table 
        WHERE question_ID = ${id}
    `);
    const topic = await cxt.db.execute(`
        SELECT * FROM 
        topics_table
        WHERE ID IN (${question[0].topics});
    `);
    await cxt.render("item", {question,answer,topic});
});
module.exports=app.routes();