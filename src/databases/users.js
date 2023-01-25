const { connectDB } = require('./init');

const usersDB = {
    getUser: (context, id) => {
        let sql = `
            select * from users
            where id = ${id}
        `;
        context.log(sql)
        return new Promise((resolve, reject) => {
            connectDB.query(
                sql,
                (err, result) => {
                    return err ? reject(err) : resolve(result[0]);
                }
            );
        });
    },
}
module.exports = usersDB;