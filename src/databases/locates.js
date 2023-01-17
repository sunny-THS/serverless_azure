const { connectDB } = require('./init');

const locates = {
    getSelfLocates: (user_id) => {
        let sql = `
            select * from locate
            where user_id = ${user_id}
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
    getLocates: (context) => {
        let sql = `
            select * 
            from locate join coordinates
                on locate.coordinates_id = coordinates.id join users
                on users.id = locate.user_id
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
    setSelfLocate: (context, user_id, locate) => {
        let sql = `
            insert locate(user_id, coordinates_id, status, title, content, image)
            values (
                ${user_id}, 
                '${locate.coordinates_id}', 
                ${locate.status}, 
                '${locate.title}', 
                '${locate.content}', 
                '${locate.image}')
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

module.exports = locates;