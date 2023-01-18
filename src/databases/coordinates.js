const { connectDB } = require('./init');

const coordinatesDB = {
    getCoordinates: (context) => {
        let sql = `
            select * from coordinates
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
    setCoordinate: (context, id, latitude, longitude) => {
        let sql = `
            insert coordinates(id, latitude, longitude)
            values('${id}', '${latitude}', '${longitude}')
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
};

module.exports = coordinatesDB;