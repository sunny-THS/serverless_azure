const { connectDB } = require('./init');

const providerDB = {
    checkProviderExists: (context, name) => {
        let sql = `
            select * 
            from provider
            where \`name\` = '${name}'
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
    getProvider: (context) => {
        let sql = `
            select * 
            from provider
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
    createNewProvider: (context, name) => {
        let sql = `
            insert provider(\`name\`)
            values ('${name}')
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

module.exports = providerDB;