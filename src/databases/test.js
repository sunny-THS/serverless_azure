const { connectDB } = require('./init');


const testDB = {
    getDB: (context) => {
        let sql = `
            select * from test
        `;
        context.log(sql)
        return new Promise((resolve, reject) => {
            connectDB.query(
                sql,
                (err, result) => {
                    return err ? reject(err) : resolve(result);
                }
            );
        });
    }
};

module.exports = testDB