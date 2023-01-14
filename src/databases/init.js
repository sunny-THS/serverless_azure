if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();

const sql = require('mssql');

const initSQL = {
    connectDB: (context) => {
        context.log("Starting...");
        try {
            return initSQL.config// sql.connect(initSQL.config);
        } catch (err) {
            context.log('init db', err);
            throw err;
        }
    },
    config: {
        user: process.env.USERNAME_SERVER_SQL,
        password: process.env.PASSWORD_SERVER_SQL,
        server: process.env.SERVER_NAME, 
        port: process.env.PORT_SQL, 
        database: process.env.DATABASE_NAME,
        TrustServerCertificate : true,
        options: {
            trustedconnection: false
        }
    }
};

module.exports = initSQL;