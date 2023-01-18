const { connectDB } = require('./init');

const areaDelimitationDB = {
    getAreaDelimitation: (context) => {
        let sql = `
            select * 
            from area_delimitation           
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
    getDetailDelimitation: (context, area_delimitation_id) => {
        let sql = `
            select * 
            from detail_delimitation
            where area_delimitation_id = '${area_delimitation_id}'     
            order by sort  
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
    setAreaDelimitation: (context, id, user_id, status) => {
        let sql = `
            insert area_delimitation(id, user_id, \`status\`)
            values ('${id}', ${user_id}, ${status})
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
    setDetailDelimitation: (context, area_delimitation_id, details) => {
        let dataSql = details.map(detail => {
            return `('${area_delimitation_id}', '${detail.coordinates_id}', ${detail.sort})`;
        }).join(',');

        let sql = `
            insert detail_delimitation(area_delimitation_id, coordinates_id, sort)
            values ${dataSql}
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
}

module.exports = areaDelimitationDB; 