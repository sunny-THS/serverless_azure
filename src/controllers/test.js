const { getDB } = require("../databases/test");

const test = {
    getDb: async (context) => {
        try {
            let data = await getDB(context);
            context.log('----data', data);

            return data;
        } catch (error) {
            context.log({
                host: process.env.DB_SERVER_NAME,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT,
            });
            context.log('err', error);
            throw new Error(error)
        }
    }
}

module.exports = test;