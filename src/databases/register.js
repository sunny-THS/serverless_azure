const { connectDB } = require('./init');

const registerDB = {
    checkExists: (context, email) => {
        let sql = `
            select * from users
            where email = '${email}'
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
    register: (context, email, name, password) => {
        let sql = `
            insert users(email, name, password)
            values('${email}', '${name}', '${password}')
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
module.exports = registerDB;