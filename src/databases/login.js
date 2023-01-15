const { connectDB } = require('./init');

const loginDB = {
    login: (context, email, password) => {
        let sql = `
            select * from users
            where email = '${email}' and password = '${password}' 
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
    }
}
module.exports = loginDB;