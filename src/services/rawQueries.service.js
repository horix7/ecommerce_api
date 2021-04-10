import sequelize, { QueryTypes } from "sequelize"


export const ordersCrossJoinQueries = async() => {
    const records = await sequelize.query('select * as `Orders`', {
        type: QueryTypes.SELECT
      });

    return records
      
}