const { connectDB } = require('./init');

const genotypesDB = {
    getGenotypes: (context) => {
        let sql = `
            select * 
            from genotypes
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
    },
};

module.exports = genotypesDB;